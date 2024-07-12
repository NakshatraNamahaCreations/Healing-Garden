import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Banner, Team } from "../data";
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";

export default function Categorylist() {
  const [categoryData, setcategoryData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    let response = await axios.get(
      "https://api.healinggarden.co.in/api/category/getcategory"
    );

    setcategoryData(response.data.data);
  };

  return (
    <>
      <div className="categoryview p-3">
        <hr className="row hr-line" style={{ borderColor: "white" }} />
        <a className="footertext" href="/">
          Home
        </a>{" "}
        {">"} <a className="footertext">Workshops</a>
        {">"}{" "}
        <a className="footertext" href="categorylist">
          Categories
        </a>{" "}
      </div>

      <div className="col-md-12 ">
        <Carousel data-bs-theme="dark">
          {Banner.map((Ele, index) => (
            <Carousel.Item>
              <img
                className="col-md-12 p-0 PositionR"
                height={460}
                src={`${Ele.img}`}
                alt="banner"
              />

              <p className="main_heaidng fs-1 text-white banner-text">
                {Ele.info}
              </p>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="row text-center m-auto mt-5">
        <p className="main_heaidng">Workshops All Categories</p>
      </div>
      <div
        className="col-md-11 m-auto"
        style={{ color: "green", border: "1px solid #d2bca0" }}
      ></div>
      <div className="container mt-3">
        <div className="row m-auto  mt-5 text-center ">
          <div className="col-md-12 m-auto ">
            <div className="row  category-main">
              {categoryData?.map((Ele) => {
                return (
                  <div className="col-md-4  mt-4 text-center">
                    <Link
                      className="linktype"
                      state={{ category: Ele.category }}
                      to="/workshop"
                    >
                      {/* <div className="col-md-7 p-4 m-auto categoryall-contianer  text-center"> */}
                      {/* <div> */}
                      <img
                        className="row m-auto p-4 categoryall-contianer"
                        width={180}
                        height={180}
                        src={`https://api.healinggarden.co.in/Category/${Ele?.categoryImage}`}
                      />
                      {/* </div> */}
                      {/* </div> */}
                      <p className="col-md-8 m-auto sub_heading p-3">
                        {Ele.category}
                      </p>
                    </Link>
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
