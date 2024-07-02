import React, { useEffect, useState } from "react";

import {
  Banners,
  Team,
  Clients,
  testimonialsvid,
  testimonialsReview,
  PopularEvents,
} from "../data";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
export default function Home() {

  const [categoryData, setcategoryData] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllCategory()
  }, []);

  const getAllCategory = async () => {
    let response = await axios.get(
      "http://api.healinggarden.co.in/api/category/getcategory"
    );

    setcategoryData(response.data.data);

  };
  return (
    <>
      <div className="col-md-12 ">
        <Carousel data-bs-theme="dark">
          {Banners.map((Ele, index) => (
            <Carousel.Item>
              {index === 0 && Ele.video ? (
                <video
                  className="col-md-12 p-0"
                  autoPlay
                  height={570}
                  src={Ele.video}
                />
              ) : (
                <img
                  className="col-md-12 p-0"
                  height={570}
                  src={`${Ele.img}`}
                  alt="banner"
                />
              )}
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="row m-auto">
        <div className="row  text-center mt-5">
          <p className="main_heaidng ">Our Workshops Objectives</p>
          <p className="sub_heading">
            We Collaborate With you to achieve desired objectives & outcomes!
          </p>
        </div>
      </div>
      <div
        className="col-md-11 m-auto"
        style={{ color: "green", border: "1px solid #d2bca0" }}
      ></div>
      <div className="row m-auto objective-main p-5 mt-5 text-center">
        {Team.map((Ele) => {
          return (
            <div className="col-md-3 m-5 object-contianer p-0 ">
              <img
                className="col-md-12 p-0 m-0 object_img"
                height={200}
                src={Ele.img}
              />
              <p className="categorytext p-3">{Ele.title}</p>
            </div>
          );
        })}
      </div>
      <div className="row m-auto text-center mt-5">
        <button className="col-md-2 m-auto sub_heading request-pr p-3 shadow">
          Request A Proposal
        </button>
      </div>
      <div className="row m-auto text-center mt-5">
        <p className="main_heaidng fs-1 sourc">
          Let's create a personalized program for your team members!
        </p>
      </div>

      <div className="row m-auto text-center mt-5">
        <p className="main_heaidng">Our Workshops Categories</p>
      </div>
      <div
        className="col-md-11 m-auto "
        style={{ color: "green", border: "1px solid #d2bca0" }}
      ></div>
      <div className="row m-auto  mt-2 text-center ">
        <div className="col-md-10 m-auto ">
          <div className="row  category-main">
            {categoryData?.slice(0, 6).map((Ele) => {
              return (
                <div className="col-md-4  mt-4 text-center">
                  <Link
                    className="linktype"
                    state={{ category: Ele.category, idd: Ele._id }}
                    to="/workshop"
                  >
                    <img
                      className="row category_img p-2 m-auto"
                      height={100}
                      width={100}
                      src={`http://api.healinggarden.co.in/Category/${Ele?.categoryImage}`}
                    />
                    <p className="categorytext col-md-5 m-auto ">{Ele.category}</p>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="row">
            <div className="col-md-10 m-auto"></div>
            <div className="col-md-2 m-auto">
              <div className="row">
                <Link to="/categorylist">
                  <button className="col-md-8 p-1 text-white viewall ">
                    View All {">>>"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* clients */}

      <div className="row m-auto clients-main p-5 mt-5 ">
        <div className="row">
          <div className="col-md-1"></div>
          <p className="col-md-9 main_heaidng textindex ">Clients Served</p>
          <div className="col-md-2">
            <Link to="/client-served">
              <button className="col-md-7 p-1 text-white viewallclient">
                View All {">>>"}
              </button>
            </Link>
          </div>
        </div>
        <div
          className="col-md-11 m-auto textindex"
          style={{ color: "green", border: "1px solid black" }}
        ></div>

        <div className="col-md-10 m-auto">
          <div className="row">
            {Clients.slice(0, 6).map((Ele) => {

              return (
                <div className="col-md-4 ">
                  <img
                    className="m-auto mt-5 "
                    width={`${Ele.type === "ge2" ? "80" : "200"}`}
                    src={Ele.logo}
                  />
                </div>
              );
            })}{" "}

          </div>

        </div>
      </div>
      {/* Testimonials */}
      <div className="row m-auto testimonials-main p-5 mt-5 ">
        <div className="row">
          <div className="col-md-1"></div>
          <p className="col-md-9 main_heaidng  ">Testimonials </p>
          <div className="col-md-2 m-auto">
            <div className="row">
              <Link to="/testimonials">
                <button className="col-md-8 p-1 text-white viewall ">
                  View All {">>>"}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="col-md-11 m-auto "
          style={{ color: "green", border: "1px solid black" }}
        ></div>

        <div className="row m-auto  p-5 mt-2 text-center">
          {testimonialsvid.slice(0, 3).map((Ele) => {
            return (
              <div className="col-md-3 m-auto object-contianer testi_contianer ">
                <iframe
                  className="row m-auto  mt-4 video rounded"
                  // width="290"
                  // height="180"
                  style={{ width: "100%" }}
                  src={Ele.video}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>{" "}
                <div className="row m-auto p-4">
                  <p className="categorytext m-auto">{Ele.name}</p>
                  <p className="categorytext m-auto">{Ele.companyname}</p>{" "}
                </div>
              </div>
            );
          })}
        </div>
        <div className="row m-auto  p-5 mt-5  text-center">
          {testimonialsReview.slice(0, 3).map((Ele, index) => {
           
            return (
              <div className="col-md-3  m-auto object-contianer review p-0 PositionR">
                <img
                  className="m-auto testimonal-image shadow-sm"
                  height={140}
                  src={Ele.Image}
                />
                <p className="categorytext text-white m-auto mt-5">
                  {Ele.name}
                </p>
                <p className="categorytext text-white m-auto">
                  {Ele.companyname}
                </p>
                <p className="row reviws m-auto m-1 p-1">
                {Ele.Reviews.length > 350 ? Ele.Reviews.substring(0, 350) : Ele.Reviews}...
                {Ele.Reviews.length > 350 && (<a href="/testimonials">View More</a>)}
                 </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Events */}

      {/* <div className="row m-auto testimonials-main p-5 mt-2 ">
        <div
          className="col-md-11 m-auto "
          style={{ color: "green", border: "1px solid black" }}
        ></div>
        <div className="container">
          <div className="row mt-3">
            <p className="main_heaidng   text-center">Popular Events </p>
          </div>
          <div className="row m-auto  p-2 mt-2 text-center ">
            {PopularEvents.slice(0, 4).map((Ele) => {
              return (
                <div className="col-md-5 mt-1 m-auto PositionR ">
                  <div className="row event_border"></div>{" "}
                  <img
                    className="row m-auto  mt-4  "
                    height={280}
                    width={500}
                    src={Ele.img}
                  />
                  <div className="m-auto event_text">
                    <p className="main_heaidng text-white fs-1 sourc">
                      {Ele.eventname}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}

      <div className="row m-auto testimonials-main p-5 mt-2">
        <div
          className="col-md-11 m-auto"
          style={{ color: "green", border: "1px solid black" }}
        ></div>
        <div className="container">
          <div className="row mt-3">
            <p className="main_heaidng text-center">Popular Events</p>
          </div>
          <div className="row m-auto p-2 mt-2 text-center">
            {PopularEvents.slice(0, 4).map((Ele) => {
              return (
                <div
                  className="col-md-5 mt-1 m-auto PositionR"
                  key={Ele.eventname}
                >
                  <div className="row event_border"></div>
                  <div className="image-container">
                    <img
                      className="row m-auto mt-4"
                      height={280}
                      width={500}
                      src={Ele.img}
                      alt={Ele.eventname}
                    />
                  </div>
                  <div className="m-auto event_text">
                    <p className="main_heaidng text-white fs-1 sourc">
                      {Ele.eventname}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
