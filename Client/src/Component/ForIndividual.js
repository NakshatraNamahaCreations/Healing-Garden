import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { AboutBanner } from "./data";
import { LuFilter } from "react-icons/lu";
import { RxReset } from "react-icons/rx";
import { MdOutlineSort } from "react-icons/md";
import axios from "axios";

export default function ForIndividual() {
  const [openFilter, setopenFilter] = useState(false);
  const [sort, setSort] = useState(false);
  let initialdata = {
    price: {},
    category: {},
    city: {},
    mode: {},
  };
  const [selectedData, setselectedData] = useState(initialdata);
  const [Workshop, setWorkshop] = useState([]);
  const [categoryData, setcategoryData] = useState([]);

  const handleSelect = (event) => {
    const { name, checked, value } = event.target;
    setselectedData((prevState) => {
      const updatedCategory = {
        ...prevState[name],
        [value]: checked,
      };

      if (!checked) {
        delete updatedCategory[value];
      }

      return {
        ...prevState,
        [name]: updatedCategory,
      };
    });
  };

  useEffect(() => {
    getAllWorkShop();
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    let response = await axios.get(
      "http://localhost:8002/api/category/getcategory"
    );
    setcategoryData(response.data.data);
  };

  const getAllWorkShop = async () => {
    let response = await axios.get(
      "http://localhost:8002/api/workshop/getallworkshop"
    );
    let filteredData = response.data.data.filter(
      (ele) => ele.Live === "Live" && ele.clientType === "Individual"
    );
    setWorkshop(filteredData);
    setFilteredWorkshop(filteredData);
  };
  const [FilteredWorkshop, setFilteredWorkshop] = useState([]);

  const handleFilter = async () => {
    // Check if any filters are applied
    const isCategoryFilterApplied = Object.values(selectedData.category).some(
      Boolean
    );
    const isCityFilterApplied = Object.values(selectedData.city).some(Boolean);
    const isModeFilterApplied = Object.values(selectedData.mode).some(Boolean);
    const isPriceFilterApplied = Object.values(selectedData.price).some(
      Boolean
    );

    // If no filters are applied, return all workshops
    if (
      !isCategoryFilterApplied &&
      !isCityFilterApplied &&
      !isModeFilterApplied &&
      !isPriceFilterApplied
    ) {
      setFilteredWorkshop(Workshop);
      setopenFilter(false);
      return;
    }

    // Filter workshops based on selected filters
    let filteredData = Workshop.filter((ele) => {
      let isCategoryMatch = true;
      let isCityMatch = true;
      let isModeMatch = true;
      let isPriceMatch = true;

      // Check category
      if (isCategoryFilterApplied) {
        isCategoryMatch = Object.keys(selectedData.category).some(
          (key) => selectedData.category[key] && ele.category === key
        );
      }

      // Check city
      if (isCityFilterApplied) {
        isCityMatch = Object.keys(selectedData.city).some(
          (key) => selectedData.city[key] && ele.city === key
        );
      }

      // Check mode
      if (isModeFilterApplied) {
        let eleMode = JSON.parse(ele.mode);
        isModeMatch = Object.keys(selectedData.mode).some((key) => {
          if (selectedData.mode[key]) {
            return (
              (eleMode.online && key === "Online") ||
              (eleMode.offline && key === "Offline")
            );
          }
          return true; // If mode filter not applied, include all modes
        });
      }

      // Check price
      if (isPriceFilterApplied) {
        isPriceMatch = Object.keys(selectedData.price).some((key) => {
          if (selectedData.price[key]) {
            if (key === "Free" && ele.OfferPrice === 0) {
              return true;
            } else if (
              key === "0.Rs-500" &&
              ele.OfferPrice > 0 &&
              ele.OfferPrice <= 500
            ) {
              return true;
            } else if (
              key === "Rs. 501 - Rs. 2000" &&
              ele.OfferPrice > 500 &&
              ele.OfferPrice <= 2000
            ) {
              return true;
            } else if (
              key === "Rs. 2001 - Rs. 5000" &&
              ele.OfferPrice > 2000 &&
              ele.OfferPrice <= 5000
            ) {
              return true;
            } else if (key === "Above Rs. 5000" && ele.OfferPrice > 5000) {
              return true;
            }
          }
          return true; // If price filter not applied, include all prices
        });
      }

      return isCategoryMatch && isCityMatch && isModeMatch && isPriceMatch;
    });

    // Update filtered workshops state
    setFilteredWorkshop(filteredData);
    setopenFilter(false);
  };
  const handleSortPrice = (sortType) => {
    let sortedData = [...FilteredWorkshop];

    switch (sortType) {
      case "Default":
        setselectedData(initialdata);

        setFilteredWorkshop(Workshop);
        return;
      case "Low to High":
        sortedData.sort((a, b) => a.OfferPrice - b.OfferPrice);
        break;
      case "High to Low":
        sortedData.sort((a, b) => b.OfferPrice - a.OfferPrice);
        break;
      default:
        break;
    }
    setFilteredWorkshop(sortedData);
  };

  const navigate = useNavigate();
  const handleView = (data) => {
    navigate("/view", { state: { item: data, mode: Mode } });
  };

  function formatDate(dateString) {
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

  let currentDate = new Date().toISOString().slice(0, 10);
  const [Mode, setMode] = useState({
    online: false,
    offline: false,
  });

  const handleCheck = () => {};
  const handleReset = () => {
    setselectedData(initialdata);
    setFilteredWorkshop(Workshop);
    setopenFilter(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <p className="p-1">
          {" "}
          <a className="footertext" href="/">
            Home
          </a>{" "}
          {">"}{" "}
          <a className="footertext" href="/individual">
            {" "}
            For Individuals
          </a>
        </p>
      </div>
      <div className="row m-auto p-2 ">
        <p className="about-us sourc">For Individuals</p>
      </div>
      <div className="col-md-12 ">
        <Carousel data-bs-theme="dark">
          {AboutBanner.map((Ele, index) => (
            <Carousel.Item key={index}>
              <img
                className="col-md-12 p-0 PositionR"
                height={430}
                src={`${Ele.img}`}
                alt="banner"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="row m-auto  PositionR">
        <div className="row m-auto p-2 text-center">
          <div className="col-md-1"></div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-3">
                <select className="row p-1 select text_light">
                  <option value={"Bengaluru"}>Bengaluru</option>
                  <option value={"Hyderabad"}>Hyderabad</option>
                  <option value={"Mumbai"}>Mumbai</option>
                </select>
              </div>
              <div className="col-md-6">
                {" "}
                <span className="sub_heading me-2"> Mode :</span>
                <span className="me-2">
                  <input type="checkbox" onChange={handleCheck} />
                  Online
                </span>
                <span>
                  <input type="checkbox" onChange={handleCheck} />
                  Offline
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-5"></div>
        </div>
        <div className="row m-auto p-2 text-center">
          <div className="col-md-5"></div>
          <p className="col-md-3 about-us ">Live Workshop</p>
          <div className="col-md-1"></div>
          <div className="col-md-3 d-flex">
            <button
              onClick={() => setopenFilter(!openFilter)}
              className="me-2 cursor filterbtn p-0 about-us inter "
            >
              <LuFilter className="fs-4 " /> Filter
            </button>
            <button
              onClick={() => setSort(!sort)}
              className="filterbtn p-0  cursor about-us inter "
            >
              {" "}
              <MdOutlineSort className="fs-4" />
              Sort
            </button>
          </div>
        </div>
        <div className="col-md-11 m-auto PositionR">
          <div className="row m-auto team-main   text-center">
            {FilteredWorkshop?.map((Ele) => {
              let workshopSlots = JSON.parse(Ele.WorkshopSlots);
              let filteredSlots = workshopSlots.slots.filter(
                (ele) => ele.Workshodate === currentDate
              );

              return (
                <div className="col-md-3 m-4" key={Ele._id}>
                  <div className="row individual-contianer p-0">
                    <img
                      className="col-md-12 p-0 m-0 indi_img"
                      height={150}
                      src={`http://localhost:8002/Product/${Ele.WorkshopImages?.[0]}`}
                      onClick={() => handleView(Ele)}
                    />
                    <p className="individualtext p-2 m-0">
                      {filteredSlots.length > 0
                        ? formatDate(filteredSlots[0].Workshodate)
                        : "No workshop available today"}
                    </p>
                  </div>
                  <p className="m-auto  textbold inter">{Ele.workshopTitle}</p>
                  <p className="m-auto">{Ele.sessionAddress}</p>
                  <p className="">
                    <span className="textbold inter me-2 offerprice">
                      Rs.{Ele.WFeePerParticipant}
                    </span>
                    <span className="textbold inter"> Rs.{Ele.OfferPrice}</span>
                  </p>
                </div>
              );
            })}
          </div>
          {openFilter && (
            <div className="row filter-main ">
              <div className="row m-auto mt-4">
                {/* Price */}
                <div className="col-md-3">
                  <p className="inter textbold">Price</p>
                  <div className="row">
                    <p>
                      <input
                        className="me-2 m-auto"
                        name="price"
                        value="Free"
                        onChange={handleSelect}
                        type="checkbox"
                        checked={selectedData.price["Free"] || false}
                      />
                      <span className="f12 m-auto">Free</span>
                    </p>
                    <p>
                      <input
                        className="me-2 m-auto"
                        name="price"
                        value="0.Rs-500"
                        onChange={handleSelect}
                        type="checkbox"
                        checked={selectedData.price["0.Rs-500"] || false}
                      />
                      <span className="f12 m-auto">0.Rs-500</span>
                    </p>
                    <p>
                      <input
                        className="me-2 m-auto"
                        name="price"
                        value="Rs. 501 - Rs. 2000"
                        onChange={handleSelect}
                        type="checkbox"
                        checked={
                          selectedData.price["Rs. 501 - Rs. 2000"] || false
                        }
                      />
                      <span className="f12 m-auto">Rs. 501 - Rs. 2000</span>
                    </p>
                    <p>
                      <input
                        className="me-2 m-auto"
                        name="price"
                        value="Rs. 2001 - Rs. 5000"
                        onChange={handleSelect}
                        type="checkbox"
                        checked={
                          selectedData.price["Rs. 2001 - Rs. 5000"] || false
                        }
                      />
                      <span className="f12 m-auto">Rs. 2001 - Rs. 5000</span>
                    </p>
                    <p>
                      <input
                        className="me-2 m-auto"
                        name="price"
                        value="Above Rs. 5000"
                        onChange={handleSelect}
                        type="checkbox"
                        checked={selectedData.price["Above Rs. 5000"] || false}
                      />
                      <span className="f12 m-auto">Above Rs. 5000</span>
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div className="col-md-4">
                  <p className="inter textbold">Category</p>
                  {categoryData.map((Ele, index) => (
                    <p key={index}>
                      <input
                        className="me-2 m-auto"
                        name="category"
                        value={Ele._id}
                        onChange={handleSelect}
                        type="checkbox"
                        checked={selectedData.category[Ele._id] || false}
                      />
                      <span className="f12 m-auto">{Ele.category}</span>
                    </p>
                  ))}
                </div>

                {/* Mode */}
                <div className="col-md-2">
                  <p className="inter textbold">Mode</p>
                  <div className="row">
                    <p>
                      <input
                        className="me-2 m-auto"
                        name="mode"
                        value="Online"
                        onChange={handleSelect}
                        type="checkbox"
                        checked={selectedData.mode["Online"] || false}
                      />
                      <span className="f12 m-auto">Online</span>
                    </p>
                    <p>
                      <input
                        className="me-2 m-auto"
                        name="mode"
                        value="Offline"
                        onChange={handleSelect}
                        type="checkbox"
                        checked={selectedData.mode["Offline"] || false}
                      />
                      <span className="f12 m-auto">Offline</span>
                    </p>
                  </div>
                </div>

                {/* City */}
                <div className="col-md-3">
                  <p className="inter textbold">City</p>
                  <div className="row">
                    <p>
                      <input
                        className="me-2 m-auto"
                        name="city"
                        value="Mumbai"
                        onChange={handleSelect}
                        type="checkbox"
                        checked={selectedData.city["Mumbai"] || false}
                      />
                      <span className="f12 m-auto">Mumbai</span>
                    </p>
                    <p>
                      <input
                        className="me-2 m-auto"
                        name="city"
                        value="Hyderabad"
                        onChange={handleSelect}
                        type="checkbox"
                        checked={selectedData.city["Hyderabad"] || false}
                      />
                      <span className="f12 m-auto">Hyderabad</span>
                    </p>
                    <p>
                      <input
                        className="me-2 m-auto"
                        name="city"
                        value="Bengaluru"
                        onChange={handleSelect}
                        type="checkbox"
                        checked={selectedData.city["Bengaluru"] || false}
                      />
                      <span className="f12 m-auto">Bengaluru</span>
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 d-flex m-auto">
                    <div className="col-md-6">
                      <RxReset
                        className="cursor"
                        onClick={() => setselectedData(initialdata)}
                      />
                      <br />
                      <span className="text_light cursor" onClick={handleReset}>
                        Reset
                      </span>
                    </div>

                    <div className="col-md-6">
                      <button className="donebtn p-1 " onClick={handleFilter}>
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sort */}

          {sort && (
            <div className="row sort-main">
              <div className="m-auto sort-inner   ">
                <div className="row text-center">
                  <p
                    onClick={() => handleSortPrice("Default")}
                    className="inter cursor p-2 m-auto text_light"
                  >
                    Default
                  </p>

                  <p
                    onClick={() => handleSortPrice("Low to High")}
                    className="inter cursor p-2 m-auto text_light"
                  >
                    Low to High
                  </p>
                  <p
                    onClick={() => handleSortPrice("High to Low")}
                    className="inter cursor p-2 m-auto text_light"
                  >
                    High to Low
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
