import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "axios";
export default function View() {
  const location = useLocation();
  let data = location.state || null;
  const [Workshop, setWorkshop] = useState([]);

  useEffect(() => {
    getAllCategory();
    getAllWorkShop();
    getorderdata();
  }, []);

  const navigate = useNavigate();

  const settings = {
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [categoryData, setcategoryData] = useState();
  const [OrderData, setOrderData] = useState([]);
  const getAllCategory = async () => {
    let response = await axios.get(
      "http://localhost:8002/api/category/getcategory"
    );
    let FilterData = response.data.data.find(
      (ele) => ele._id === data?.item?.category
    );
    setcategoryData(FilterData);
  };
  const getorderdata = async () => {
    let response = await axios.get(
      "http://localhost:8002/api/order/getallorder"
    );
    setOrderData(response.data.data);
  };

  const getAllWorkShop = async () => {
    let response = await axios.get(
      "http://localhost:8002/api/workshop/getallworkshop"
    );
    setWorkshop(response.data.data);
  };
  let currentDate = new Date().toISOString().slice(0, 10);
  function formatDate(dateString) {
    console.log(dateString, "dateString");
    let date = new Date(dateString);
    let suffixes = ["th", "st", "nd", "rd"];

    function getSuffix(day) {
      if (day >= 11 && day <= 13) {
        return "th";
      }
      return suffixes[day % 10] || "th";
    }

    function format(date) {
      let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let dayOfWeek = daysOfWeek[date.getDay()];
      let dayOfMonth = date.getDate();
      let daySuffix = getSuffix(dayOfMonth);
      let formattedDay = `${dayOfWeek}, ${dayOfMonth}${daySuffix}`;

      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let month = months[date.getMonth()];

      return `${formattedDay} ${month} Onwards`;
    }

    return format(date);
  }

  function formatAll(dateString, startTime, endTime) {
    let date = new Date(dateString);
    let suffixes = ["th", "st", "nd", "rd"];

    function getSuffix(day) {
      if (day >= 11 && day <= 13) {
        return "th";
      }
      return suffixes[day % 10] || "th";
    }

    function formatDate(date) {
      let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let dayOfWeek = daysOfWeek[date.getDay()];
      let dayOfMonth = date.getDate();
      let daySuffix = getSuffix(dayOfMonth);
      let formattedDay = `${dayOfWeek}, ${dayOfMonth}${daySuffix}`;

      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let month = months[date.getMonth()];

      return `${formattedDay} ${month}`;
    }

    function formatTime(timeString) {
      let time = new Date(`1970-01-01T${timeString}Z`);
      let hours = time.getUTCHours();
      let minutes = time.getUTCMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return `${hours}:${minutes} ${ampm}`;
    }

    let formattedDate = formatDate(date);
    let formattedStartTime = formatTime(startTime);
    let formattedEndTime = formatTime(endTime);
    return `${formattedDate} at ${formattedStartTime} - ${formattedEndTime}`;
  }

  const [showFullDescription, setShowFullDescription] = useState(false);
  let workshopSlots = JSON.parse(data?.item?.WorkshopSlots);
  const [viewSlots, setviewSlots] = useState(false);
  const [SelectedDate, setSelectedDate] = useState();
  const handleSelectdate = (data) => {
    setSelectedDate(data);
  };

  const generateOrderId = (prefix, OrderData) => {
    let nextId = OrderData.length + 1;

    let currentMonth = new Date().getMonth() + 1;

    let currentDate = new Date().getDate();
    let dateRange = `${currentDate}-${currentDate + 1}`;

    return `${prefix}/${currentMonth
      .toString()
      .padStart(2, "0")}/${dateRange}-${nextId}`;
  };
  const userDataStr = localStorage.getItem("userdata");

  const handleBookWorkShop = async (item) => {
    try {
      const userDataStr = localStorage.getItem("userdata");

      if (!userDataStr) {
        alert("Please Login");
        return window.location.assign("/login");
      }

      const userData = JSON.parse(userDataStr);
      const userid = userData?._id;

      let orderId = generateOrderId("HG", OrderData);

      let config = {
        url: "http://localhost:8002/api/order/addorder",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          OrderDetails: {
            SelectedDate: SelectedDate,
            item: item,
          },
          userId: userid,
          orderStatus: "Pending",
          OrderID: orderId,
        },
      };

      let res = await axios(config);

      if (res.status === 200) {
        alert("Your Order Confirmed");
        navigate("/cart", { state: { data } });
      } else {
        console.log("Failed to add order");
      }
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="categoryview m-auto row ">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <p className="p-1">
          {" "}
          Home {">"} For Individuals {">"} {categoryData?.category} {">"}{" "}
          {data?.item?.workshopTitle}
        </p>
      </div>
      <div className="row m-auto mt-5 ">
        <div className="col-md-6 PositionR">
          <img
            className="row m-auto viewimg p-0"
            height={350}
            src={`http://localhost:8002/Product/${data?.item.WorkshopImages?.[0]}`}
          />
          <div className="row m-auto mt-2">
            <div className="col-md-1"></div>
            <div className="col-md-8">
              <div className="row ">
                <p className="col-md-3 sub_heading  textbold ">Schedule </p>{" "}
                <span className="col-md-2">
                  {" "}
                  {workshopSlots.slots.length > 3 && (
                    <a
                      className="readmore cursor m-auto"
                      onClick={() => setviewSlots(!viewSlots)}
                    >
                      {!viewSlots ? "More" : "Less"}
                    </a>
                  )}
                </span>
                <div className="row m-auto textbold inter ">
                  {workshopSlots?.sessionType === "One Session" &&
                    workshopSlots?.slots?.map((ele) =>
                      formatAll(ele.Workshodate, ele.startTime, ele.endTime)
                    )}
                  {workshopSlots?.sessionType ===
                    "Multiple Sessions in a Workshop" && !viewSlots
                    ? workshopSlots?.slots?.slice(0, 3).map((ele) => (
                        <>
                          <a
                            className="cursor linktype"
                            key={ele.id}
                            onClick={() => handleSelectdate(ele)}
                          >
                            {formatAll(
                              ele.Workshodate,
                              ele.startTime,
                              ele.endTime
                            )}
                          </a>
                        </>
                      ))
                    : workshopSlots?.slots?.map((ele) => (
                        <>
                          <a
                            key={ele.id}
                            className="cursor linktype"
                            onClick={() => handleSelectdate(ele)}
                          >
                            {formatAll(
                              ele.Workshodate,
                              ele.startTime,
                              ele.endTime
                            )}
                          </a>
                        </>
                      ))}
                </div>
              </div>
            </div>
          </div>

          <img
            className="viewsvg1"
            width={250}
            height={250}
            src="../wobjectives/Drawing-04.svg"
            // src="../wobjectives/Drawing-06.svg"
          />
        </div>

        <div className="col-md-6 ">
          <p className="main_heading categorycolor sourc">
            {data?.item?.workshopTitle}
          </p>
          <p className="sub_sub_heading  m-auto">
            {data?.item.language} | {data?.item.minAge}yrs | Location:{" "}
            <a href={data?.item?.gMapDirection}>Go</a>
          </p>
          <p className="sub_sub_heading  ">
            {data?.item.sessionAddress} <MdLocationPin className="direction" />
            <span className="direction">Direction</span>{" "}
          </p>
          <p className="sub_heading textbold inter">About</p>
          <ul>
            <div
              className="sub_heading"
              dangerouslySetInnerHTML={{
                __html: showFullDescription
                  ? data?.item?.discription?.[0]
                  : `${data?.item?.discription?.[0].substring(0, 400)}...`,
              }}
            />

            <a
              className="readmore cursor"
              style={{ position: "relative", zIndex: "10" }}
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {!showFullDescription ? " Read More..." : " Read Less"}
            </a>
          </ul>
          <div className="row">
            <button
              className="col-md-4 book-now p-1"
              onClick={() => handleBookWorkShop(data.item)}
            >
              <p className="m-auto inter textbold">
                Rs.{data?.item?.OfferPrice}/-
              </p>
              <p className="m-auto inter textbold">Book Now</p>
            </button>
          </div>
          <img
            className="viewsvg2"
            width={300}
            height={300}
            src="../wobjectives/Drawing-06.svg"
          />
        </div>
      </div>
      <div className="row m-auto view-reason p-5 mt-3">
        <div className="row PositionR">
          <img
            className="viewsvg3"
            width={250}
            height={250}
            src="../wobjectives/Drawing-06.svg"
          />

          <p className="main_heading subtext text_light">Reasons to join</p>

          <li className="reason text_light">
            Streath team cohesion collabroation through creative expression.
          </li>
          <li className="reason text_light">
            Reduce stress and enhance mental well-being the therapeutic nature
            of canvas painting.
          </li>
          <li className="reason text_light">
            Engcourage individual expression, fostering a positive and uplifting
            workplace atomsphere.{" "}
          </li>
          <a className="readmore f12">Read More...</a>
        </div>
        <div className="row mt-5 ">
          <p className="main_heading subtext text_light">Terms & Condition</p>
          <ul>
            {JSON?.parse(data?.item?.terms)?.discription?.map((data, index) => {
              return <li className="reason text_light">{data}</li>;
            })}
          </ul>
        </div>
      </div>
      <div className="row m-auto mb-5  mt-3 PositionR">
        <div className="row m-auto p-2 text-center">
          <p className="sub_heading textbold">YOU MAY ALSO LIKE</p>
        </div>
        <div className="col-md-11 m-auto">
          {/* <Slider {...settings}>
            {Workshop?.map((Ele) => {
              let workshopSlots = JSON.parse(Ele.WorkshopSlots);
              let filteredSlots = workshopSlots.slots.filter(
                (ele) => ele.Workshodate === currentDate
              );
              return (
                <div style={{ margin: "15px" }}>
                  <div className="view-contianer p-0">
                    <img
                      className="col-md-12 p-0 m-0 indi_img"
                      height={150}
                      src={`http://localhost:8002/Product/${Ele.WorkshopImages?.[0]}`}
                      // onClick={() => handleBook(Ele)}
                    />
                    <p className="individualtext p-2 m-0 text-center">
                      {filteredSlots.length > 0
                        ? formatDate(
                            filteredSlots.map((ele) => ele.Workshodate)
                          )
                        : "No workshop available today"}
                    </p>
                  </div>
                  <p className="m-auto col-md-10  text-center textbold inter">
                    {Ele.workshopTitle}
                  </p>

                  <p className="m-auto col-md-10  text-center mode ">
                    {JSON.parse(Ele.mode).online === true && "Online"} /{" "}
                    {JSON.parse(Ele.mode).offline === true && "Offline"}
                  </p>

                  <p className="m-auto col-md-10 text-center">
                    <span className="textbold inter me-2  offerprice">
                      Rs.{Ele.WFeePerParticipant}
                    </span>

                    <span className="textbold inter"> Rs.{Ele.OfferPrice}</span>
                  </p>
                </div>
              );
            })}
          </Slider> */}
          <Slider {...settings}>
            {Workshop?.map((Ele) => {
              let workshopSlots = JSON.parse(Ele.WorkshopSlots);
              let filteredSlots = workshopSlots.slots.filter(
                (ele) => ele.Workshodate === currentDate
              );
              return (
                <div style={{ margin: "15px" }}>
                  <div className="view-contianer p-0">
                    <img
                      className="col-md-12 p-0 m-0 indi_img"
                      height={150}
                      src={`http://localhost:8002/Product/${Ele.WorkshopImages?.[0]}`}
                      // onClick={() => handleBook(Ele)}
                    />
                    <p className="individualtext p-2 m-0 text-center">
                      {filteredSlots.length > 0
                        ? formatDate(
                            filteredSlots.map((ele) => ele.Workshodate)
                          )
                        : "No workshop available today"}
                    </p>
                  </div>
                  <p className="m-auto col-md-10  text-center textbold inter">
                    {Ele.workshopTitle}
                  </p>

                  <p className="m-auto col-md-10  text-center mode ">
                    {JSON.parse(Ele.mode).online === true && "Online"} /{" "}
                    {JSON.parse(Ele.mode).offline === true && "Offline"}
                  </p>

                  <p className="m-auto col-md-10 text-center">
                    <span className="textbold inter me-2  offerprice">
                      Rs.{Ele.WFeePerParticipant}
                    </span>

                    <span className="textbold inter"> Rs.{Ele.OfferPrice}</span>
                  </p>
                </div>
              );
            })}
          </Slider>
          <img
            className="viewsvg5"
            width={250}
            height={250}
            src="../wobjectives/Drawing-06.svg"
          />
          <img
            className="viewsvg6"
            width={250}
            height={250}
            src="../wobjectives/Drawing-03.svg"
          />
        </div>
      </div>
    </>
  );
}
