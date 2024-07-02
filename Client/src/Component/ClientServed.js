import React, { useEffect } from "react";
import { Clients } from "./data";

export default function ClientServed() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
  }, []);
  return (
    <>
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <p className="p-1"> Home {">"} Clients</p>
      </div>
      <div className="row m-auto p-2 ">
        <p className="about-us sourc">Clients Served</p>
      </div>
      <div className="row m-auto">
        {Clients?.map((Ele) => {
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
    </>
  );
}
