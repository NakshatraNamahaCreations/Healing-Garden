import React, { useEffect, useState } from "react";
import { testimonialsvid, testimonialsReview } from "./data";

export default function Testimonials() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <p className="p-1"> Home {">"} Testimonial </p>
      </div>
      <div className="row m-auto p-2 ">
        <p className="about-us sourc">Testimonial </p>
      </div>

      <div class="container">
        <div class="row">
          {testimonialsvid.map((Ele) => {
            return (
              <div class="col-lg-4 col-md-6">
                <div className=" mt-4  m-3 testi_contianerm testi_contianer ">
                  <iframe
                    className="row m-auto  mt-4 video rounded"
                    style={{ width: "100%" }}
                    src={Ele.video}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>{" "}
                  <div className="row m-auto p-4 text-center">
                    <p className="categorytext m-auto">{Ele.name}</p>
                    <p className="categorytext m-auto">
                      {Ele.companyname}
                    </p>{" "}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div class="container">
        <div class="row">
          {testimonialsReview.map((Ele) => {
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
                    <p className="row reviws m-auto m-1 p-1">{Ele.Reviews}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
