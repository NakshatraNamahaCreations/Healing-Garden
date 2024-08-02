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
import RequestProposal from "../Request";
export default function Home() {
  const [categoryData, setcategoryData] = useState([]);
  useEffect(() => {
    // window.scrollTo(0, 0);
    getAllCategory();
  }, []);
  const [Proposal, setProposal] = useState(false);
  const getAllCategory = async () => {
    let response = await axios.get(
      "http://localhost:8002/api/category/getcategory"
    );

    setcategoryData(response.data.data);
  };
  return (
    <>
      <div className="col-12">
        <Carousel data-bs-theme="dark">
          {Banners.map((Ele, index) => (
            <Carousel.Item key={index}>
              {index === 0 && Ele.video ? (
                <video
                  className="d-block w-100 carosel-img"
                  autoPlay
                  src={Ele.video}
                
                />
              ) : (
                <img
                  className="d-block w-100 carosel-img"
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
      <div className="row m-auto objective-main p-5  mt-5 text-center">
        {Team.map((Ele) => {
          return (
            <div className="col-lg-3 col-md-4 col-sm-6 m-5 object-contianer p-0 ">
              <img className="p-0 m-0 object_img" height={200} src={Ele.img} />
              <p className="categorytext p-3 ">{Ele.title}</p>
            </div>
          );
        })}
      </div>

      <div className="row m-auto text-center mt-5">
        <button
          className="col-md-2 col-sm-7 col-7 mx-auto sub_heading request-pr p-md-2  shadow"
          onClick={() => setProposal(true)}
        >
          Request A Proposal
        </button>
      </div>
      <div className="row m-auto text-center mt-5">
        <p className="main_heaidng  sourc">
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
                      src={`http://localhost:8002/Category/${Ele?.categoryImage}`}
                    />
                    <p className="categorytext col-md-5 m-auto ">
                      {Ele.category}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="row ">
            <div className="col-md-1"></div>
            <p className="col-8 col-md-9  main_heaidng textindex "></p>
            <div className="col-4 col-md-2">
              <Link to="/categorylist">
                <button className="col-12 col-md-7 p-1 text-white viewall">
                  View All {">>>"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* clients */}

      <div className="row m-auto clients-main mt-5 ">
        <div className="row mt-3">
          <div className="col-md-1"></div>
          <p className="col-7 col-md-9 p-1 client_heaidng textindex ">
            Clients Served
          </p>
          <div className="col-5 col-md-2">
            <Link to="/client-served">
              <button className="col-12 col-md-7 p-1 text-white viewallclient">
                View All {">>>"}
              </button>
            </Link>
          </div>
        </div>
        <div
          className="col-md-10 m-auto textindex"
          style={{ color: "green", border: "1px solid black" }}
        ></div>

        <div className="col-md-10 m-auto">
          <div className="row  mb-4">
            {Clients.slice(0, 6).map((Ele) => {
              return (
                <div className="col-md-4 ">
                  <img
                    className="m-auto mt-5 row"
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

      <div className="row m-auto padd-main  mt-5">
        <div className="row ">
          <div className="col-md-1"></div>
          <p className="col-7 col-md-9  client_heaidng textindex ">
            Testimonials
          </p>
          <div className="col-5 col-md-2">
            <Link to="/testimonials">
              <button className="col-12 col-md-7 p-1 text-white viewallclient">
                View All {">>>"}
              </button>
            </Link>
          </div>
        </div>
        <div
          className="col-md-11 m-auto"
          style={{ color: "green", border: "1px solid black" }}
        ></div>

        <div className="row m-auto  mt-5 text-center">
          {testimonialsvid.slice(0, 3).map((Ele, index) => {
            return (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-3 mb-5 m-auto object-contianer testi_contianer"
              >
                <iframe
                  className="row m-auto mt-4 video rounded"
                  src={Ele.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
                <div className="row m-auto p-4">
                  <p className="categorytext m-auto">{Ele.name}</p>
                  <p className="categorytext m-auto">{Ele.companyname}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div class="row m-auto  text-center">
          {testimonialsReview.slice(0, 3).map((Ele) => {
            return (
              <div class="col-lg-4 col-md-6 mt-5">
                <div className="review review2 PositionR ">
                  <img
                    className="m-auto testimonal-image shadow-sm"
                    height={140}
                    src={Ele.Image}
                  />
                  <div className="row mt-5 m-2 text-center">
                    <p className=" categorytext text-white m-auto mt-5">
                      {Ele.name}
                    </p>
                    <p className=" categorytext text-white m-auto">
                      {Ele.companyname}
                    </p>
                    <p className=" reviws m-auto m-1 p-1">
                      {Ele.Reviews.length > 350
                        ? Ele.Reviews.substring(0, 350)
                        : Ele.Reviews}
                      ...
                      {Ele.Reviews.length > 350 && (
                        <a href="/testimonials">View More</a>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {Proposal && <RequestProposal open={Proposal} setOpen={setProposal} />}

      <div className="row m-auto padd-main mt-1">
        <div
          className="col-md-11 m-auto"
          style={{ color: "green", border: "1px solid black" }}
        ></div>

        <div className="container">
          <div className="row m-auto mt-2">
            <p className="main_heaidng text-center">Popular Events</p>
          </div>

          <div className="row  m-auto row-cols-1 padd-main row-cols-md-2 g-5 mt-2">
            {PopularEvents.slice(0, 4).map((Ele, index) => {
              return (
                <div
                  className="col-md-6 m-4  mt-5 m-auto PositionR"
                  key={index}
                >
                  <div className="event_border"></div>
                  <div className="">
                    <img
                      src={Ele.img}
                      className="card-img-top"
                      alt={Ele.eventname}
                    />
                    <div className="event_text text-center">
                      <p className="main_heaidng text-white fs-1">
                        {Ele.eventname}
                      </p>
                    </div>
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
