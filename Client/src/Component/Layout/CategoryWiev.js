import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { categoryData, Banner, Team } from "../data";
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";

export default function CategoryWiev() {
  let location = useLocation();
  let data = location.state.category || null;
  let idd = location.state.idd || null;
  const [Workshop, setWorkshop] = useState([]);

  const [Filtered, setFiltered] = useState([]);

  useEffect(() => {
    getAllWorkShop();
    window.scrollTo(0, 0);
  }, [idd]);

  const getAllWorkShop = async () => {
    let response = await axios.get(
      "http://localhost:8002/api/workshop/getallworkshop"
    );
    let filteredData = response.data.data.filter((ele) => ele.category == idd);
    console.log(filteredData, "filteredData");
    setWorkshop(response.data.data);
    setFiltered(filteredData);
  };
  const navigate = useNavigate();
  const handleView = (data) => {
    navigate("/view", { state: { item: data } });
  };

  return (
    <>
      <div className="categoryview p-3">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <a className="footertext" href="/">
          Home
        </a>{" "}
        {">"} <a className="footertext">Workshops</a> {">"}{" "}
        <a className="footertext" href="categorylist">
          {data}
        </a>{" "}
      </div>

      <div className="row text-center m-auto p-2">
        <p className="main_heaidng">{data}</p>
      </div>
      <div className="col-md-12 ">
        <Carousel data-bs-theme="dark">
          {Banner.map((Ele, index) => (
            <Carousel.Item>
              <img
                className="col-md-12 p-0 PositionR"
                height={430}
                src={`${Ele.img}`}
                alt="banner"
              />

              <p className="main_heaidng fs-1 text-white banner-text sourc">
                {Ele.info}
              </p>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="row text-center m-auto mt-5 ">
        <p className="main_heaidng ">Workshop Categories</p>
      </div>
      <img
        className="svg_1"
        src="./wobjectives/Drawing-04.svg"
        width={300}
        height={300}
      />
      <div
        className="col-md-11 m-auto"
        style={{ color: "green", border: "1px solid #d2bca0" }}
      ></div>
      <div className="container index_value">
        <div className="row m-auto   text-center ">
          <div className="col-md-12 m-auto ">
            <div className="row  category-main index_value">
              {Filtered?.map((Ele) => {
                return (
                  <div className="col-md-4    mt-4 text-center ">
                    <div className="row">
                      <img
                        onClick={() => handleView(Ele)}
                        className="col-md-9 m-auto cursor p-0"
                        width={220}
                        height={220}
                        style={{
                          borderRadius: "40px",
                          border: "5px solid #a77a43",
                        }}
                        src={`http://localhost:8002/Product/${Ele.WorkshopImages?.[0]}`}
                      />
                    </div>
                    <div className="row">
                      <p className=" text-center m-auto sub_heading p-3 ">
                        {Ele.workshopTitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <img
          className="svg_6"
          src="./wobjectives/Drawing-06.svg"
          width={400}
          height={400}
        />
        <img
          className="svg_3 "
          src="./wobjectives/Drawing-03.svg"
          width={300}
          height={300}
        />
        <img
          className="svg_5"
          src="./wobjectives/Drawing-05.svg"
          width={300}
          height={300}
        />
      </div>
      <img
        className="svg_2"
        src="./wobjectives/Drawing-02.svg"
        width={350}
        height={450}
      />

      <div className="row text-center m-auto mt-5 ">
        <p className="main_heaidng fs-2 categorytext textbold">
          To book Workshops for your Employees or private groups.
        </p>
      </div>
      <div className="row text-center m-auto mt-2 ">
        <button className="col-md-2 m-auto mb-5 p-3 main_heaidng  categorytext contact-us textbold sourc">
          Contact Us
        </button>
      </div>

      <div
        className="col-md-11 m-auto mt-5"
        style={{ color: "green", border: "1px solid #d2bca0" }}
      ></div>

      <div className="container mt-3 index_value">
        <img
          className="svg_7"
          src="./wobjectives/Drawing-07.svg"
          width={400}
          height={400}
        />
        <div className="row  m-auto mt-5">
          <p className="categorytext main_heaidng  textbold">
            Explore Our other Workshops <FaArrowRight />
          </p>
        </div>
        <div className="row m-auto  mt-3 text-center ">
          <div className="col-md-10 m-auto ">
            <div className="row  category-main ">
              {Workshop?.slice(0, 3).map((Ele) => {
                return (
                  <div className="col-md-4  mt-2 text-center index_value">
                    {" "}
                    <img
                      className="row category_img category_img1 m-auto p-2 "
                      height={100}
                      src={`http://localhost:8002/Product/${Ele.WorkshopImages?.[0]}`}
                    />
                    <p className="col-md-6 m-auto sub_heading fs-15 p-3t ">
                      {Ele.workshopTitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
