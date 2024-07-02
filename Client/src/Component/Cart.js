import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsDatabaseExclamation } from "react-icons/bs";
import Moment from "react-moment";

export default function Cart() {
  const [OrderData, setOrderData] = useState(null);
  const userDataStr = localStorage.getItem("userdata");
  const userid = JSON.parse(userDataStr)?._id;

  useEffect(() => {
    if (userid) {
      getorderdata();
    }
    window.scrollTo(0, 0);
  }, [userid]);

  const getorderdata = async () => {
    try {
      const response = await axios.get(
        "http://api.healinggarden.co.in/api/order/getallorder"
      );
      const date = new Date();

      // Find the order for the current user and today's date
      const data = response.data.data
        .filter(
          (ele) =>
            ele.userId === userid && isSameDay(new Date(ele.createdAt), date)
        )
        .reverse();
      setOrderData(data?.[0]);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  // Function to check if two dates are on the same day
  const isSameDay = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  return (
    <>
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }} />
        <p className="p-1">
          <a className="footertext" href="/">
            Home
          </a>{" "}
          {">"}{" "}
          <a className="footertext" href="about">
            Cart
          </a>{" "}
        </p>
      </div>
      <div className="row m-auto p-2 shadow-sm">
        <p className="about-us sourc text-center">Order Confirmation</p>
      </div>
      <div className="container m-auto p-2">
        <p className="about-us sourc">Thank you for placing the order!</p>
        <p className="sub_heading textbold">Order Details:</p>
        <div className="row">
          <div className="col-md-2">
            <p className="text_light m-auto">Day of Booking:</p>
            <p className="text_light m-auto">
              <Moment format="Do MMMM YYYY">{OrderData?.createdAt}</Moment>
            </p>
          </div>
          <div className="col-md-2">
            <p className="text_light m-auto">Booking ID:</p>
            <p className="text_light m-auto">{OrderData?.OrderID}</p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-3">
            <img
              src="./workshop/abot4.jpeg"
              className="row "
              style={{ borderRadius: "15px" }}
              height={120}
              alt=""
            />
          </div>
          <div className="col-md-6">
            <p>
              <span className="textbold">Workshop/Session : </span>
              <span className="textbold">
                {OrderData?.OrderDetails?.item?.workshopTitle}{" "}
                {OrderData?.OrderDetails?.item?.sessionAddress}
              </span>
            </p>
            <p className="text_light">
              <Moment format="ddd, Do MMMM YYYY | hh:mm A">
                {OrderData?.OrderDetails?.SelectedDate}
              </Moment>{" "}
              -{" "}
              <Moment
                add={{ minutes: OrderData?.OrderDetails?.duration }}
                format="hh:mm A"
              >
                {OrderData?.OrderDetails?.startTime}
              </Moment>
            </p>
            <div>
              <p className="textbold m-auto">Ticket-2 : </p>
              <span className="textbold">
                Total Amount - Rs. {OrderData?.OrderDetails?.item?.OfferPrice}{" "}
                (Including taxes)
              </span>
            </div>
          </div>
        </div>
        <div className="row mt-5 ">
          <div className="col-md-8 address p-3">
            <div className="row">
              <div className="col-md-6">
                <p className="textbold">Registered address:</p>
              </div>
              <div className="col-md-6">
                <p className="textbold">GSTIN: 29AYVPS1501R2ZF</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                <p className="text_light m-auto">Healing Garden</p>
                <p className="text_light m-auto">
                  Brigade Buena Vista, Old Madras Road, Bangalore-560049
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
}
