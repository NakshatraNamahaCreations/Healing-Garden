import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RxTarget } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";

import axios from "axios";
import RequestProposal from "./Request";
export default function CorporateView() {
  const location = useLocation();
  let data = location.state || null;
  const [Workshop, setWorkshop] = useState([]);
  const [FilteredWorkshop, setFilteredWorkshop] = useState([]);
  const [RecentlyVisited, setRecentlyVisited] = useState([]);

  const [viewSlots, setviewSlots] = useState(false);
  const [SelectedDate, setSelectedDate] = useState();
  const [open, setOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [ShowFullReasonToJoin, setShowFullReasonToJoin] = useState(false);

  const [FilteredCategory, setFilteredCategory] = useState([]);
  const [categoryData, setcategoryData] = useState();
  const [OrderData, setOrderData] = useState([]);
  useEffect(() => {
    getAllCategory();
    getAllWorkShop();
    getorderdata();
  }, []);

  const navigate = useNavigate();

  const getAllCategory = async () => {
    let response = await axios.get(
      "http://localhost:8002/api/category/getcategory"
    );
    let FilterData = response.data.data.find(
      (ele) => ele._id === data?.item?.category
    );
    let FilterCate = response.data.data.filter(
      (ele) => ele.category === FilterData?.category
    );

    setcategoryData(FilterData);
    setFilteredCategory(FilterCate);
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

    setRecentlyVisited(response.data.data);
    let filtred = response.data.data.filter(
      (ele) => ele.category === data.item.category
    );
    setFilteredWorkshop(filtred);
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

  let workshopSlots = JSON.parse(data?.item?.WorkshopSlots);

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
  const primaryObjective = data?.item?.primaryObjective;

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
              className="col-md-6 request-corporat p-2"
              onClick={() => setOpen(true)}
            >
              Request A Proposal
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

          <p className="main_heading subtext text_light">Benefits</p>
          <ul>
            <div
              className="reason"
              dangerouslySetInnerHTML={{
                __html: ShowFullReasonToJoin
                  ? data?.item?.reasonToJoin?.[0]
                  : `${data?.item?.reasonToJoin?.[0].substring(0, 100)}...`,
              }}
            />
          </ul>
          <a
            className="col-md-2 readmore cursor"
            style={{ position: "relative", zIndex: "1" }}
            onClick={() => setShowFullReasonToJoin(!ShowFullReasonToJoin)}
          >
            {!ShowFullReasonToJoin ? " Read More..." : " Read Less"}
          </a>
        </div>
      </div>
      <div className="row m-auto  mt-5">
        <div className="col-md-4 col-2 corporate-detal shadow m-auto">
          <div className="row text-center p-2">
            <p className="m-auto sub_heading ">Primary Objectives</p>
          </div>
          <div className="row">
            {primaryObjective?.map((objective, index) => (
              <div className="row" key={index}>
                {/* <div className="col-md-2">
                  <RxTarget />
                </div> */}
                <div className="col-md-8 m-auto">
                  <p
                    className="row m-auto"
                    dangerouslySetInnerHTML={{ __html: objective }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-4 col-2 corporate-detal shadow m-auto">
          <div className="row text-center p-2">
            <p className="m-auto sub_heading ">Suitable For</p>
          </div>
          <div className="row">
            {data?.item?.SuitableFor?.map((objective, index) => (
              <div className="row" key={index}>
                {/* <div className="col-md-2">
                  <FaCheck />
                </div> */}
                <div className="col-md-8 m-auto">
                  <p
                    className="row m-auto"
                    dangerouslySetInnerHTML={{ __html: objective }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row m-auto  mt-3 ">
          <div className="row m-auto d-flex">
            <div className="col-md-3 ">
              <p className="sub_heading textbold">Similar Workshop</p>
            </div>
            <div className="col-md-7"></div>
            <div className="col-5 col-md-2">
              <Link to="/workshop">
                <button className="col-12 col-md-7 p-1 text-white viewallclient">
                  View All {">>>"}
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-11 m-auto">
            <div className="row">
              {FilteredWorkshop?.slice(0, 4)?.map((Ele) => {
                return (
                  <div className="col-md-3  mt-4 text-center">
                    <Link
                      className="linktype"
                      state={{ category: Ele.category }}
                      to="/workshop"
                    >
                      <img
                        className="row m-auto p-0 workshp-contianer"
                        width={200}
                        height={200}
                        src={`http://localhost:8002/Product/${Ele.WorkshopImages?.[0]}`}
                      />

                      <div className="row p-2">
                        <p className="col-md-10 text-center m-auto categorytext ">
                          {Ele.workshopTitle}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

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
        <div className="row m-auto  mt-3 ">
          <div className="row m-auto d-flex">
            <div className="col-md-4 ">
              <p className="sub_heading textbold">Our Workshop Categories</p>
            </div>
            <div className="col-md-6"></div>
            <div className="col-5 col-md-2">
              <Link to="/categorylist">
                <button className="col-12 col-md-7 p-1 text-white viewallclient">
                  View All {">>>"}
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-11 m-auto">
            <div className="row">
              {FilteredCategory?.slice(0, 6).map((Ele) => {
                return (
                  <div className="col-md-4  mt-4 text-center">
                    <img
                      className="row category_img p-2 m-auto"
                      height={100}
                      width={100}
                      src={`http://localhost:8002/Category/${Ele?.categoryImage}`}
                    />
                    <p className="categorytext col-md-5 m-auto p-2">
                      {Ele.category}
                    </p>
                  </div>
                );
              })}
            </div>

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

        <div className="row m-auto  mt-3 ">
          <div className="row m-auto d-flex">
            <div className="col-md-3 ">
              <p className="sub_heading textbold">Recently Visited</p>
            </div>
            <div className="col-md-7"></div>
            <div className="col-5 col-md-2">
              <Link to="/workshop">
                <button className="col-12 col-md-7 p-1 text-white viewallclient">
                  View All {">>>"}
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-11 m-auto">
            <div className="row">
              {RecentlyVisited?.slice(0, 4)?.map((Ele) => {
                return (
                  <div className="col-md-3  mt-4 text-center">
                    <Link
                      className="linktype"
                      state={{ category: Ele.category }}
                      to="/workshop"
                    >
                      <img
                        className="row m-auto p-0 workshp-contianer"
                        width={200}
                        height={200}
                        src={`http://localhost:8002/Product/${Ele.WorkshopImages?.[0]}`}
                      />

                      <div className="row p-2">
                        <p className="col-md-10 text-center m-auto categorytext ">
                          {Ele.workshopTitle}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

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
      </div>
      {open && <RequestProposal open={open} setOpen={setOpen} />}
    </>
  );
}
