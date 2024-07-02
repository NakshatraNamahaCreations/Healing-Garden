import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Form, Button, Card, Label } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { customStyles } from "./data";
import Offcanvas from "react-bootstrap/Offcanvas";
import http from "../http.common.function";
import { ServicePage } from "../ServicePage";
import { ImageApiURL } from "../../src/path";
import { CgAdd } from "react-icons/cg";

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { FormLabel } from "react-bootstrap";
export default function Workshop() {
  const [Pimage, setPimage] = useState("");
  const [ProductData, setProductData] = useState();
  const [editProduct, seteditProduct] = useState(false);
  const [EditData, setEditData] = useState();
  const [ProductID, setProductID] = useState();
  const [SearchValue, setSearchValue] = useState("");
  const [showProduct, setshowProduct] = useState(false);
  const [SelectedMin, setSelectedMin] = useState();
  const [Discount, setDiscount] = useState();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  let InitialData = {
    Workshopname: "",
    Category: "",
    SKUId: "",
    Size: "",
    Variant: "",
    FeePerparticipant: "",
    Qty: "",
    ConveyanceORlabourCharges: "",
    InstructorFee: "",
    GST: "",
    IGST: "",
    CGST: "",
    Description: "",
    duration: "",
    WorkshopSlots: [],
  };
  const [value, onChange] = useState(new Date());
  const invoiceContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate("/PrductView", { state: { id: id } });
  };

  const [Mode, setMode] = useState({
    online: false,
    offline: false,
  });
  const [FormProductData, setFormProductData] = useState(InitialData);
  const [selectedSlots, setSelectedSlots] = useState([
    { start: "", end: "", Workshodate: "" },
  ]);
  const handleDateAdd = () => {
    setSelectedSlots([
      ...selectedSlots,
      { start: "", end: "", Workshodate: "" },
    ]);
  };
  const handleChangedate = (e, index) => {
    const { name, value } = e.target;
    const updatedSlots = [...selectedSlots];
    updatedSlots[index][name] = value;
    setSelectedSlots(updatedSlots);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.Category || null,
    },

    {
      name: "WorkShop",
      selector: (row) => row.Workshopname || null,
    },
    {
      name: "WorkshopImage",
      selector: (row) => (
        <>
          <img
            width={50}
            height={50}
            src={`${ImageApiURL}/Product/${row?.WorkshopImage}`}
          />
        </>
      ),
    },

    // {
    //   name: "SKUId",
    //   selector: (row) => row.SKUId || null,
    // },
    // {
    //   name: "Size",
    //   selector: (row) => row.Size || null,
    // },
    // {
    //   name: "Variant",
    //   selector: (row) => row.Variant || null,
    // },
    {
      name: "Fee Per participant",
      selector: (row) => {
        return <p> ₹{row.FeePerparticipant || null}</p>;
      },
    },
    // {
    //   name: "Qty",
    //   selector: (row) => row.Qty || null,
    // },
    // {
    //   name: "ConveyanceORlabourCharges",
    //   selector: (row) => row.ConveyanceORlabourCharges || null,
    // },
    // {
    //   name: "InstructorFee",
    //   selector: (row) => row.InstructorFee || null,
    // },
    {
      name: "ACTION",
      selector: (row) => {
        return (
          <div className="row">
            <span
              className="hyperlink col-md-3"
              onClick={() => handleUpdateProduct(row._id)}
              style={{ cursor: "pointer" }}
            >
              <i
                class="fa-solid fa-pen"
                title="Edit"
                style={{ color: "#ffc107" }}
              ></i>{" "}
              |{" "}
            </span>
            <a
              onClick={() => deleteProduct(row._id)}
              className="hyperlink mx-1 col-md-3"
            >
              <i
                class="fa fa-trash"
                title="Delete"
                style={{ color: "#dc3545" }}
              ></i>
            </a>{" "}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    if (invoiceContainerRef.current) {
      const dataTableContainer =
        invoiceContainerRef.current.querySelector(".rdt_Table");
      if (dataTableContainer) {
        dataTableContainer.classList.add("printableDataTable");
      }
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: () => invoiceContainerRef.current,
  });
  const handleInvoice = (id) => {
    navigate("/Invoice", { state: id });
  };
  const handleSubmit = () => {};

  useEffect(() => {
    fetchGetData();
  }, [FormProductData.Qty]);
  useEffect(() => {
    getProduct();
  }, [SearchValue]);

  let fetchGetData = async () => {
    let data = await ServicePage.getalldiscount();
    let client = await ServicePage.getAllClient();
    let filterdata = data?.find((ele) => ele._id === FormProductData.Qty);
    setDiscount(data);
    setSelectedMin(filterdata);
  };
  let categoryData = [
    { cate: "Nature & Gardening", img: "./Img/cate.jpg" },
    { cate: "Art & Craft", img: "./Img/cate2.jpg" },
    { cate: "Mindfulness & Self-Healing", img: "./Img/cate3.jpg" },
    { cate: "Curated Experiences", img: "./Img/cate4.jpg" },
    { cate: "Life & Corporate Coaching", img: "./Img/cate5.jpg" },
    { cate: "Special Days", img: "./Img/cate6.jpg" },
    { cate: "Sound Healing", img: "./Img/img (1).jpg" },
    { cate: "Pottery", img: "./Img/img (3).jpeg" },
    { cate: "Meditation", img: "./Img/img (1).avif" },
  ];
  const AddProduct = async () => {
    try {
      if (
        !FormProductData.Category ||
        !FormProductData.Workshopname ||
        FormProductData.SKUId ||
        FormProductData.Size ||
        FormProductData.Variant ||
        FormProductData.FeePerparticipant ||
        FormProductData.Qty ||
        FormProductData.ConveyanceORlabourCharges ||
        FormProductData.InstructorFee
      ) {
        alert("Please Fill");
      }
      const formdata = new FormData();

      formdata.append("WorkshopImage", Pimage);
      formdata.append("Category", FormProductData.Category);
      formdata.append("description", FormProductData.Description);
      formdata.append("Workshopname", FormProductData.Workshopname);
      formdata.append("SKUId", FormProductData.SKUId);
      formdata.append("Size", FormProductData.Size);
      formdata.append("Variant", FormProductData.Variant);
      formdata.append("FeePerparticipant", FormProductData.FeePerparticipant);
      formdata.append("Qty", FormProductData.Qty);
      formdata.append(
        "ConveyanceORlabourCharges",
        FormProductData.ConveyanceORlabourCharges
      );
      formdata.append("InstructorFee", FormProductData.InstructorFee);
      formdata.append("GST", FormProductData.GST);
      formdata.append("IGST", FormProductData.IGST);
      formdata.append("CGST", FormProductData.CGST);
      formdata.append("WorkshopSlots", JSON.stringify(selectedSlots));
      let response = await http.post(`/workshop/addworkshop`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("WorkShop Added Successfully");
        // window.location.reload("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formdata = new FormData();

      formdata.append("WorkshopImage", Pimage);
      formdata.append("Category", FormProductData.Category);
      formdata.append("Workshopname", FormProductData.Workshopname);
      formdata.append("SKUId", FormProductData.SKUId);
      formdata.append("Size", FormProductData.Size);
      formdata.append("Variant", FormProductData.Variant);
      formdata.append("FeePerparticipant", FormProductData.FeePerparticipant);
      formdata.append("Qty", FormProductData.Qty);

      formdata.append("description", FormProductData.Description);
      formdata.append(
        "ConveyanceORlabourCharges",
        FormProductData.ConveyanceORlabourCharges
      );
      formdata.append("InstructorFee", FormProductData.InstructorFee);
      formdata.append("GST", FormProductData.GST);
      formdata.append("IGST", FormProductData.IGST);
      formdata.append("CGST", FormProductData.CGST);
      formdata.append("WorkshopSlots", JSON.stringify(selectedSlots));
      formdata.append("mode", JSON.stringify(Mode));
      let response = await http.put(
        `/workshop/editProduct/${ProductID}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Workshop updated successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating Product:", error);
    }
  };
  const handleUpdateProduct = async (id) => {
    try {
      let category = await http.get(`/workshop/getbyProductid/${id}`);
      setProductID(id);
      console.log(category, "category");
      setEditData(category.data.data);
      setshowProduct(true);
      seteditProduct(true);
    } catch (error) {
      console.log("Error fetching category data:", error);
    }
  };

  const handleAddNewProduct = () => {
    setFormProductData("");
    setPimage(null);
    seteditProduct(false);
    setProductID(null);
    setEditData({});
    setshowProduct(true);
  };

  const getProduct = async () => {
    try {
      let product = await http.get(`/workshop/getbyuser`, {
        params: { searchValue: SearchValue },
      });
      setProductData(product.data.productData);
    } catch (error) {
      console.log("Error fetching category data", error);
    }
  };

  const deleteProduct = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this Workshop?`
    );

    if (confirmed) {
      let data = await http.post(`/workshop/trash/${idd}`);
      if (data.status === 200) {
        alert("Workshop deleted succesfully ");
        window.location.reload();
      }
    } else {
      console.log("Workshop canceled the deletion.");
    }
  };

  let city = ["Bengaluru", "Pune", "Hydrabad", "Delhi"];

  const [personName, setPersonName] = useState([]);

  const handleChangeCity = (event) => {
    setPersonName(event.target.value);
  };

  const handleChangeMode = (e) => {
    const { name, checked } = e.target;
    setMode((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <>
      <Card className=" mt-4 p-3">
        <div className="row">
          <div className="col-md-10 m-auto"></div>

          <button
            onClick={handleAddNewProduct}
            className="col-md-2 btn_bg p-2 m-auto float-end"
          >
            <i className="pi pi-plus"></i> Add Workshop
          </button>
        </div>
      </Card>

      <div className="row mt-4">
        <div className="col-md-9"></div>
        <div className="col-md-3 m-auto float-end">
          <Form.Control
            className=""
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search workshop..."
          />
        </div>
      </div>
      <DataTable
        className="mt-3"
        columns={columns}
        data={ProductData}
        highlightOnHover
        pointerOnHover
        pagination
        selectableRows
        bordered
        customStyles={customStyles}
      />

      <Offcanvas
        show={showProduct}
        onHide={() => setshowProduct(false)}
        placement="end"
        className="offcan"
      >
        <Offcanvas.Header className="col-md-12 ofheader">
          <div className="title ">
            <div>
              <Offcanvas.Title className="">
                {editProduct && ProductID !== null
                  ? "Modify Workshop"
                  : "Add Workshop"}{" "}
              </Offcanvas.Title>
              <p>Embed Your Workshop and Crucial Details Instantly</p>
            </div>
            <button onClick={() => setshowProduct(false)} className="closebtn ">
              x
            </button>
          </div>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Select Category</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Select
                value={FormProductData.Category}
                size="sm"
                onChange={handleChange}
                name="Category"
              >
                <option readOnly>Choose...</option>
                {categoryData?.map((cate) => (
                  <option value={cate._id}>{cate.cate}</option>
                ))}
              </Form.Select>
            </div>
          </div>

          {/* <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Select SubCategory</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Select size="sm" onChange={handleChange} name="subcategory">
                <option disabled>Choose...</option>

                {Category?.map((cate) => (
                  <option value={cate._id}>{cate.category}</option>
                ))}
              </Form.Select>
            </div>
          </div> */}
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Workshop Session/Title</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                defaultValue={
                  editProduct && ProductID !== null
                    ? EditData.Workshopname
                    : FormProductData.Workshopname
                }
                onChange={handleChange}
                name="Workshopname"
                placeholder="Workshop Title"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Mode</Form.Label>
            </div>
            <div className="col-md-8">
              <div className="d-flex">
                <Form.Check
                  className="me-2"
                  checked={Mode.online}
                  onChange={handleChangeMode}
                  name="online"
                  type="checkbox"
                />
                <Form.Label className="me-2">Online</Form.Label>

                <Form.Check
                  checked={Mode.offline}
                  onChange={handleChangeMode}
                  name="offline"
                  type="checkbox"
                  className="me-2"
                />
                <Form.Label>Offline</Form.Label>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="row mb-3">
              <div className="col-md-4">
                <Form.Label>Add Date</Form.Label>
                <CgAdd
                  style={{ color: "#2f2fef", fontWeight: "bold" }}
                  onClick={handleDateAdd}
                />
              </div>
              <div className="col-md-8">
                <div className="row ">
                  {selectedSlots.map((slot, index) => (
                    <>
                      <div className="col-md-6 ">
                        <label>Start</label>
                        <Form.Control
                          value={slot.duration}
                          onChange={(e) => handleChangedate(e, index)}
                          name="start"
                          type="datetime-local"
                        />
                      </div>
                      <div className="col-md-6 ">
                        <label>End</label>
                        <Form.Control
                          value={slot.duration}
                          onChange={(e) => handleChangedate(e, index)}
                          name="end"
                          type="datetime-local"
                        />
                      </div>
                    </>
                  ))}{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Instructor Fee </Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                defaultValue={
                  editProduct && ProductID !== null
                    ? EditData.instructorFee
                    : FormProductData.InstructorFee
                }
                onChange={handleChange}
                name="InstructorFee"
                placeholder="Instructor Fee"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4 m-auto">
              <Form.Label>City </Form.Label>
            </div>
            <div className="col-md-8 m-auto">
              <FormControl className="row m-auto p-0" sx={{ width: 450 }}>
                <Select
                  className="row p-0"
                  multiple
                  value={personName}
                  onChange={handleChangeCity}
                  input={<OutlinedInput />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {city.map((cityname) => (
                    <MenuItem key={cityname} value={cityname}>
                      <Checkbox checked={city.indexOf(cityname) > -1} />
                      <ListItemText primary={cityname} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>SKUId </Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                defaultValue={
                  editProduct && ProductID !== null
                    ? EditData.SKUId
                    : FormProductData.SKUId
                }
                onChange={handleChange}
                name="SKUId"
                placeholder="SKUId"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Fee Per Participant </Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                defaultValue={
                  editProduct && ProductID !== null
                    ? EditData.FeePerparticipant
                    : FormProductData.FeePerparticipant
                }
                onChange={handleChange}
                name="FeePerparticipant"
                placeholder="Fee Per participant"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label> Conveyance / labour charges </Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                defaultValue={
                  editProduct && ProductID !== null
                    ? EditData.ConveyanceORlabourCharges
                    : FormProductData.ConveyanceORlabourCharges
                }
                onChange={handleChange}
                name="ConveyanceORlabourCharges"
                placeholder="Conveyance / labour charges"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>GST</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Select
                onChange={handleChange}
                name="GST"
                defaultValue={
                  editProduct && ProductID !== null
                    ? EditData.GST
                    : FormProductData.GST
                }
              >
                {" "}
                <option readOnly>Choose...</option>
                <option value={"0"}>0%</option>
                <option value={"5"}>5%</option>
                <option value={"12"}>12%</option>
                <option value={"18"}>18%</option>
                <option value={"28"}>28%</option>
              </Form.Select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>CGST</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Select
                onChange={handleChange}
                name="CGST"
                defaultValue={
                  editProduct && ProductID !== null
                    ? EditData.CGST
                    : FormProductData.CGST
                }
              >
                {" "}
                <option readOnly>Choose...</option>
                <option value={"0"}>0%</option>
                <option value={"5"}>5%</option>
                <option value={"12"}>12%</option>
                <option value={"18"}>18%</option>
                <option value={"28"}>28%</option>
              </Form.Select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>IGST</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Select
                onChange={handleChange}
                name="IGST"
                defaultValue={
                  editProduct && ProductID !== null
                    ? EditData.GST
                    : FormProductData.IGST
                }
              >
                {" "}
                <option readOnly>Choose...</option>
                <option value={"0"}>0%</option>
                <option value={"5"}>5%</option>
                <option value={"12"}>12%</option>
                <option value={"18"}>18%</option>
                <option value={"28"}>28%</option>
              </Form.Select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Select Min Qty</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Select
                onChange={handleChange}
                name="Qty"
                placeholder="Min Quantity"
                defaultValue={
                  editProduct && ProductID !== null
                    ? EditData.Qty
                    : FormProductData.Qty
                }
              >
                <option readOnly>Select...</option>
                {Discount?.map((ele) => (
                  <option value={ele._id}>{ele.minqty}</option>
                ))}
              </Form.Select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label> Max Qty</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                readOnly
                placeholder="Max Quantity"
                defaultValue={
                  editProduct && ProductID !== null
                    ? EditData.maxqty
                    : SelectedMin?.maxqty
                }
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Discount</Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                readOnly
                placeholder="Discount"
                defaultValue={
                  editProduct && ProductID !== null
                    ? EditData.discount
                    : SelectedMin?.discount
                }
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Description </Form.Label>
            </div>
            <div className="col-md-8">
              <Form.Control
                as="textarea"
                defaultValue={
                  editProduct && ProductID !== null
                    ? EditData.description
                    : FormProductData.Description
                }
                onChange={handleChange}
                name="Description"
                placeholder="Description"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Label>Workshop Image</Form.Label>
            </div>

            <div className="col-md-8 cateimg p-5">
              <Form.Label>
                {editProduct && ProductID !== null ? (
                  <img
                    width={40}
                    height={40}
                    src={`${ImageApiURL}/Product/${EditData.WorkshopImage}`}
                  />
                ) : (
                  <>
                    {" "}
                    {Pimage ? (
                      <img
                        src={URL.createObjectURL(Pimage)}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <i className="pi pi-cloud-upload m-auto"></i>
                    )}
                  </>
                )}
                <Form.Control
                  onChange={(e) => setPimage(e.target.files[0])}
                  className="inpfile"
                  type="file"
                />
                <p className="m-auto">Drag your image here</p>
              </Form.Label>
            </div>
          </div>
        </Offcanvas.Body>
        <div className="col-md-12  ofheader p-3">
          <div className="row">
            <button
              className="col-md-4 btn_bg p-2 m-auto"
              onClick={() => setshowProduct(false)}
            >
              Cancel
            </button>
            {editProduct && ProductID !== null ? (
              <button
                className="col-md-4 btn_bg save p-2 m-auto btncwhite"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            ) : (
              <button
                className="col-md-4 btn_bg save p-2 m-auto btncwhite"
                onClick={AddProduct}
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
