import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Form, Card, Image, Row, Col } from "react-bootstrap";
import { GrFormViewHide } from "react-icons/gr";
import { customStyles } from "./data";
import Offcanvas from "react-bootstrap/Offcanvas";
import http from "../http.common.function";
import { ImageApiURL } from "../path";

export default function Blog() {
  let InitialData = {
    title: "",
    subtitle: "",
    desc: "",
  };
  const [showBlog, setshowBlog] = useState(false);
  const [BlogData, setBlogData] = useState();

  const [BlogImage, setBlogImage] = useState("");
  const [ViewData, setViewData] = useState();
  const [isView, setisView] = useState(false);
  const [Preview, setPreview] = useState();
  const [editblog, seteditblog] = useState(false);
  const [EditData, setEditData] = useState();
  const [blogID, setblogID] = useState();
  const [SearchValue, setSearchValue] = useState("");
  const [BlogForm, setBlogForm] = useState(InitialData);
  const columns = [
    {
      name: "Title",
      selector: (row) => row?.title,
    },
    {
      name: "Subtitle",
      selector: (row) => row?.subtitle,
    },
    {
      name: "Blog Image",
      selector: (row) => (
        <>
          <img
            width={20}
            height={20}
            src={`${ImageApiURL}/BlogImage/${row?.blogimage}`}
          />
        </>
      ),
    },

    {
      name: "ACTION",
      selector: (row) => (
        <div className="row">
          <span className="hyperlink col-md-3" style={{ cursor: "pointer" }}>
            <i
              onClick={() => handleUpdateBlog(row)}
              class="fa-solid fa-pen"
              title="Edit"
              style={{ color: "#ffc107" }}
            ></i>{" "}
            |{" "}
          </span>

          <span className="hyperlink col-md-3" style={{ cursor: "pointer" }}>
            <i
              onClick={() => deleteBlog(row._id)}
              class="fa fa-trash"
              title="Delete"
              style={{ color: "#dc3545" }}
            ></i>{" "}
            |{" "}
          </span>
          <span className="hyperlink col-md-3" style={{ cursor: "pointer" }}>
            <GrFormViewHide
              onClick={() => handleView(row)}
              style={{ color: "#6EACDA" }}
            />{" "}
          </span>
        </div>
      ),
    },
  ];

  const handleChange = (e) => {
    let { name, value } = e.target;
    setBlogForm((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    getBlog();
  }, [SearchValue]);

  const AddBlog = async () => {
    try {
      const formdata = new FormData();
      formdata.append("blogimage", BlogImage);
      formdata.append("title", BlogForm.title);
      formdata.append("subtitle", BlogForm.subtitle);
      formdata.append("desc", BlogForm.desc);
      let response = await http.post(`/blog/addblog`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("Blog Added Succesfully");
        window.location.reload("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getBlog = async () => {
    try {
      let Blog = await http.get(`/blog/getblog`, {
        params: { searchValue: SearchValue },
      });
      setBlogData(Blog.data.data);
    } catch (error) {
      console.log("Error fetching Blog data", error);
    }
  };

  const deleteBlog = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this Blog?`
    );

    if (confirmed) {
      let data = await http.post(`/blog/trash/${idd}`);
      if (data.status === 200) {
        alert("Blog deleted succesfully ");
        window.location.reload();
      }
    } else {
      console.log("Blog canceled the deletion.");
    }
  };

  const handleUpdateBlog = async (row) => {
    try {
      setBlogForm({
        title: row.title,
        subtitle: row.subtitle,
        desc: row.desc,
      });
      setblogID(row._id);
      setEditData(row);

      setBlogImage(row?.blogimage);
      setPreview(`${ImageApiURL}/BlogImage/${row.blogimage}`);
      setshowBlog(true);
      seteditblog(true);
    } catch (error) {
      console.log("Error fetching Blog data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formdata = new FormData();
      formdata.append("blogimage", BlogImage);
      formdata.append("title", BlogForm.title);
      formdata.append("subtitle", BlogForm.subtitle);
      formdata.append("desc", BlogForm.desc);

      let response = await http.put(`Blog/editblog/${EditData._id}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Blog updated successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating Blog:", error);
    }
  };
  const handleAddNewBlog = () => {
    setBlogImage(null);
    seteditblog(false);
    setblogID(null);
    setEditData({});
    setshowBlog(true);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };
  const handleView = (row) => {
    setViewData(row);
    setisView(true);
  };
  return (
    <>
      {!isView ? (
        <>
          <Card className=" mt-4 p-3">
            <div className="row">
              <div className="col-md-10 m-auto"></div>

              <button
                onClick={handleAddNewBlog}
                className="col-md-2 btn_bg p-2 m-auto float-end"
              >
                <i className="pi pi-plus"></i> Add Blog
              </button>
            </div>
          </Card>{" "}
          <div className="row mt-4">
            <div className="col-md-9"></div>
            <div className="col-md-3 m-auto float-end">
              <Form.Control
                value={SearchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="fs_12"
                placeholder="Search for title or subtitle here..."
              />
            </div>
          </div>
          <DataTable
            className="mt-3"
            columns={columns}
            data={BlogData}
            highlightOnHover
            pointerOnHover
            pagination
            selectableRows
            bordered
            customStyles={customStyles}
          />
        </>
      ) : (
        <>
          <div className="row mt-3">
            <div className="col-md-10 m-auto"></div>

            <button
              onClick={() => setisView(false)}
              className="col-md-2 btn_bg p-2 m-auto float-end"
            >
              View list
            </button>
          </div>

          <div className="row">
            <div className="col-md-6">
              {/* <div className="row">
                <Image
                  src={`${ImageApiURL}/BlogImage/${ViewData.blogimage}`}
                  rounded
                />
              </div> */}
              <div className="row">
                <Image
                  src={`${ImageApiURL}/BlogImage/${ViewData.blogimage}`}
                  rounded
                />
              </div>
            </div>
            <div className="col-md-5">
              <p>
                <span className="sub-sub_heading me-3"> Title :</span>{" "}
                {ViewData.title}
              </p>
              <p>
                <span className="sub-sub_heading me-3"> Subtitle :</span>{" "}
                {ViewData.subtitle}
              </p>
              <p>
                <span className="sub-sub_heading me-3">Description </span>
              </p>
              <p> {ViewData.desc}</p>
            </div>
          </div>
        </>
      )}
      <Offcanvas
        show={showBlog}
        onHide={() => setshowBlog(false)}
        placement="end"
        className="offcan"
      >
        <Offcanvas.Header className="col-md-12 ofheader">
          <div className="title ">
            <div>
              <Offcanvas.Title className="">
                {editblog && blogID !== null ? "Modify Blog" : "Add Blog"}{" "}
              </Offcanvas.Title>
              <p>Embed Your Workshop Blog and Crucial Details Instantly</p>
            </div>
            <button onClick={() => setshowBlog(false)} className="closebtn ">
              x
            </button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row m-auto">
            <div className="col-md-4">
              <Form.Label>Title</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                value={BlogForm.title}
                onChange={handleChange}
                name="title"
                placeholder="Enter blog title"
              />
            </div>
          </div>

          <div className="row mt-4 m-auto">
            <div className="col-md-4">
              <Form.Label>Subtitle</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                value={BlogForm.subtitle}
                onChange={handleChange}
                name="subtitle"
                placeholder="Enter blog subtitle"
              />
            </div>
          </div>
          <div className="row mt-4 m-auto">
            <div className="col-md-4">
              <Form.Label>Description</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                value={BlogForm.desc}
                onChange={handleChange}
                name="desc"
                placeholder="Enter blog description"
                as="textarea"
              />
            </div>
          </div>
          <div className="row mt-4  m-auto">
            <div className="col-md-4">
              <Form.Label>Blog Image</Form.Label>
            </div>

            <div className="col-md-8 cateimg p-5">
              <Form.Label className=" m-auto">
                {" "}
                <Form.Control
                  onChange={handleImage}
                  type="file"
                  accept="image/*"
                  className="d-none inpfile"
                />
                {!Preview ? (
                  <>
                    <p> Blog Image</p>
                    <div className="row text-center upload p-4 m-auto">
                      <i className="pi pi-cloud-upload m-auto"></i>
                      <p className="m-auto">Drag your image here</p>
                    </div>
                  </>
                ) : (
                  <img src={Preview} width={100} height={100} />
                )}
              </Form.Label>
            </div>
          </div>
        </Offcanvas.Body>
        <div className="col-md-12  ofheader p-3">
          <div className="row">
            <button
              className="col-md-4 btn_bg p-2 m-auto"
              onClick={() => setshowBlog(false)}
            >
              Cancel
            </button>
            {editblog && blogID !== null ? (
              <button
                className="col-md-4 btn_bg save p-2 m-auto btncwhite"
                onClick={handleUpdate}
              >
                Update
              </button>
            ) : (
              <button
                className="col-md-4 btn_bg save p-2 m-auto btncwhite"
                onClick={AddBlog}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </Offcanvas>
    </>
  );
}
