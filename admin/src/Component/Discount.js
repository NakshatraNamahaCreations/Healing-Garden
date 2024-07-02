import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Form, Card } from "react-bootstrap";
import { ServicePage } from "../ServicePage";
import { customStyles } from "./data";
import http from "../http.common.function";

export default function DiscounCompo() {
  const [DiscountData, setDiscountData] = useState();
  const [Discount, setDiscount] = useState("");
  const [MinQty, setMinQty] = useState("");
  const [MaxQty, setMaxQty] = useState("");
  const [editDiscount, seteditDiscount] = useState(false);
  const [EditData, setEditData] = useState();
  const [DiscountID, setDiscountID] = useState();
  const [ClientsData, setClientsData] = useState();
  const columns = [
    {
      name: "Discount",
      selector: (row) => <>{row?.discount}%</>,
    },
    {
      name: "Quantity",
      selector: (row) => (
        <>
          <span>
            {row?.minqty} - {row?.maxqty}
          </span>
        </>
      ),
    },
    {
      name: "ACTION",
      selector: (row) => (
        <div className="row">
          <span className="hyperlink col-md-3" style={{ cursor: "pointer" }}>
            <i
              onClick={() => handleUpdateDiscount(row._id)}
              class="fa-solid fa-pen"
              title="Edit"
              style={{ color: "#ffc107" }}
            ></i>{" "}
            |{" "}
          </span>

          <a
            onClick={() => deleteDiscount(row._id)}
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
    getDiscount();
    getAllClient();
  }, [DiscountData]);
  const getAllClient = async () => {
    let client = await ServicePage.getAllClient();
    setClientsData(client);
  };
  const AddDiscount = async () => {
    try {
      let response = await http.post(
        `/disc/addiscount`,

        { discount: Discount, minqty: MinQty, maxqty: MaxQty },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Discount  Added Succesfully");
        window.location.reload("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDiscount = async () => {
    try {
      let Discount = await http.get(`/disc/getbyuser`);

      setDiscountData(Discount.data.data);
    } catch (error) {
      console.log("Error fetching Discount data", error);
    }
  };

  const deleteDiscount = async (idd) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this Discount?`
    );

    try {
      if (confirmed) {
        let data = await http.post(`/disc/trash/${idd}`);
        if (data.status === 200) {
          alert("Discount deleted succesfully ");
          window.location.reload();
        }
      }
    } catch (error) {
      console.log("Discount canceled the deletion.");
    }
  };

  const handleUpdateDiscount = async (id) => {
    try {
      let Discount = await http.get(`/disc/getbyiddiscount/${id}`);
      setDiscountID(id);
      setEditData(Discount.data.data);
      seteditDiscount(true);
    } catch (error) {
      console.log("Error fetching Discount  data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      setDiscount("");
      seteditDiscount(false);
      setDiscountID(null);
      setEditData({});

      let response = await http.put(
        `/disc/editdiscount/${DiscountID}`,
        { discount: Discount, minqty: MinQty, maxqty: MaxQty },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Discount  updated successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating Discount :", error);
    }
  };

  return (
    <>
      <Card className=" mt-4 p-3">
        <div className="row">
          <div className="col-md-3 m-auto">
            <Form.Control
              defaultValue={
                editDiscount && DiscountID !== null ? EditData.minqty : MinQty
              }
              placeholder="Min QTY"
              onChange={(e) => setMinQty(e.target.value)}
            />
          </div>
          <div className="col-md-3 m-auto">
            <Form.Control
              defaultValue={
                editDiscount && DiscountID !== null ? EditData.maxqty : MaxQty
              }
              placeholder="Max QTY"
              onChange={(e) => setMaxQty(e.target.value)}
            />
          </div>
          <div className="col-md-3 m-auto">
            <Form.Control
              defaultValue={
                editDiscount && DiscountID !== null
                  ? EditData.discount
                  : Discount
              }
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Discount"
            />
          </div>
          <div className="col-md-3 m-auto">
            <div className="row">
              {editDiscount && DiscountID !== null ? (
                <button
                  className="col-md-4 btn_bg save p-2 m-auto btncwhite"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              ) : (
                <button
                  className="col-md-4 btn_bg save p-2 m-auto btncwhite"
                  onClick={AddDiscount}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>

      <DataTable
        className="mt-3"
        columns={columns}
        data={DiscountData}
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
