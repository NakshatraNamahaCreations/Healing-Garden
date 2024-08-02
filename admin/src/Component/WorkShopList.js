import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Form, Card } from "react-bootstrap";

import http from "../http.common.function";
import { useNavigate } from "react-router-dom"

export const customStyles = {
  table: {
    style: {
      border: "1px solid  grey",
      borderRadius: "10px",
    },
  },
};

export default function WorkShopList() {
  const [showSubcategory, setshowSubcategory] = useState(false);
  const [WorkShopData, setWorkShopData] = useState();
  const [Subcategory, setSubCategory] = useState("");
  const [SubcategoryImage, setSubCategoryImage] = useState("");
  const [editSubcategory, seteditSubcategory] = useState(false);
  const [EditData, setEditData] = useState();
  const [SubcategoryID, setSubcategoryID] = useState();
  const [SearchValue, setSearchValue] = useState("");
  const [Category, setCategory] = useState();
  const navigate = useNavigate()
  const columns = [
    {
      name: "Category",
      selector: (row) => {
        const categoryObj = Category?.find((ele) => ele._id === row?.category);
        return categoryObj ? categoryObj.category : "";
      },
    },
    {
      name: "WorkShop Title",
      selector: (row) => row?.workshopTitle,
    },

    {
      name: "WorkShop Fee Per Participant",
      selector: (row) => row?.WFeePerParticipant,
    },

    {
      name: "Offer Price",
      selector: (row) => row?.OfferPrice,
    },
    {
      name: "min Age",
      selector: (row) => row?.minAge,
    },

    {
      name: "ACTION",
      selector: (row) => (
        <div className="row">
          <span className="hyperlink col-md-3" style={{ cursor: "pointer" }}>
            <i
              onClick={() => handleUpdateSubcategory(row._id, row)}
              class="fa-solid fa-pen"
              title="Edit"
              style={{ color: "#ffc107" }}
            ></i>{" "}
            |{" "}
          </span>

          <a
            onClick={() => deleteSubCategory(row._id)}
            className="hyperlink mx-1 col-md-3"
          >
            <i
              class="fa fa-trash"
              title="Delete"
              style={{ color: "#dc3545" }}
            ></i>
          </a>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getWorkShop();

  }, [SearchValue]);
  useEffect(() => { getcategory() }, [])

  const getWorkShop = async () => {
    try {
      let Subcategory = await http.get(`/workshop/getworkshop`, {
        params: { searchValue: SearchValue },
      });
      setWorkShopData(Subcategory.data.data);
    } catch (error) {
      console.log("Error fetching Workshop data", error);
    }
  };

  const deleteSubCategory = async (idd) => {
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

  const handleUpdateSubcategory = async (id, data) => {
    try {
      let Catedata = Category?.find((ele) => ele._id === data?.category)
      navigate("/workshopadd", { state: { idd: id, category: Catedata.category } });
    } catch (error) {
      console.log("Error fetching Workshop data:", error);
    }
  };



  const handleAddNewSubCategory = () => {
    setSubCategory("");
    setSubCategoryImage(null);
    seteditSubcategory(false);
    setSubcategoryID(null);
    setEditData({});
    setshowSubcategory(true);
    window.location.assign("/workshopadd")

  };

  const getcategory = async () => {
    try {
      let category = await http.get(`/category/getcategory`);
      setCategory(category.data.data);
    } catch (error) {
      console.log("Error fetching category data", error);
    }
  };

  return (
    <>
      <Card className=" mt-4 p-3">
        <div className="row">
          <div className="col-md-10 m-auto"></div>

          <button
            onClick={handleAddNewSubCategory}
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
            placeholder="Search Workshop..."
          />
        </div>
      </div>
      <DataTable
        className="mt-3"
        columns={columns}
        data={WorkShopData}
        highlightOnHover
        pointerOnHover
        pagination
        selectableRows
        bordered
        customStyles={customStyles}
      />

    </>
  );
}
