import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Workshopdetails() {
  const location = useLocation();
  let idd = location.state.idd || null
  const [workshopDetails, setworkshopDetails] = useState();
  const [Category, setCategory] = useState();
  useEffect(() => {
    getAllWorkShop();
    getAllCategory()
  }, [idd]);

  const getAllWorkShop = async () => {
    let response = await axios.get(
      "http://localhost:8002/api/workshop/getallworkshop"
    );
    let filteredData = response.data.data.find(
      (ele) => ele?._id === idd
    );
    setworkshopDetails(filteredData);
  };

  const getAllCategory = async () => {
    let response = await axios.get(
      "http://localhost:8002/api/category/getcategory"
    );
    let filreddata = response.data.data.find((ele) => ele?._id === workshopDetails?.category)
    console.log(filreddata, "filreddata")
    setCategory(filreddata);
  };
  const handleBook = (id) => { };
  console.log(workshopDetails, "workshopDetails")
  return (
    <div className="row m-auto">
      <div className="categoryview p-3">
        <hr className="row hr-line" style={{ borderColor: "white" }} />
        Home {">"} <span>{Category?.category}</span> {">"}{" "}
        <span>{workshopDetails?.workshopTitle}</span>
      </div>
      <div className="col-md-6">


        <img
          className="row m-auto"
          width={500}
          height={500}
          src={`http://localhost:8002/Product/${workshopDetails?.WorkshopImages?.[0]}`}
        />


      </div>
      <div className="col-md-6">

        <div >
          <p className="main_heading">{workshopDetails?.workshopTitle}</p>
          <p>
            <span className="fs-2">₹ {workshopDetails?.OfferPrice}</span>
          </p>
          <div className="col-md-8 m-auto sub_heading p-3">
            {workshopDetails && JSON.parse(workshopDetails.WorkshopSlots).slots.map((slot, index) => (
              <div key={index}>
                <p>{moment(slot.Workshodate).format("DD-MMMM-YY")}</p>
                <p>{slot.startTime}</p>
                <p>{slot.endTime}</p>
              </div>
            ))}

          </div>
          <p className="sub_heading">Service Description</p>
          {/* <p className="col-md-8 ">{workshopDetails?.description}</p> */}
          <button onClick={handleBook}>Book Now</button>
        </div>

      </div>
    </div>
  );
}
