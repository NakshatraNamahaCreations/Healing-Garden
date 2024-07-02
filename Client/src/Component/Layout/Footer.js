import React from "react";
import { SiWhatsapp } from "react-icons/si";
import { BsFacebook } from "react-icons/bs";
import { SlSocialInstagram } from "react-icons/sl";
import { IoLogoYoutube } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { TfiEmail } from "react-icons/tfi";
import { BiSolidCopyright } from "react-icons/bi";
import { useLocation } from "react-router-dom";

export default function Footer() {
  let location = useLocation();
  let hideSeoForAbout = false;
  if (location.pathname === "/about") {
    hideSeoForAbout = true;
  }
  return (
    <>
      {!hideSeoForAbout && (
        <div className="row m-auto seo p-5 mt-3 ">
          <p className="sub_sub_heaidng   text-center text-white">
            SEO is about helping search engines understand your content, and
            helping users find your site and make a decision about whether they
            should visit your site through a search engine.{" "}
          </p>
        </div>
      )}
      <div className="row m-auto me-0">
        <div className="row footer m-auto p-5">
          <div className="col-md-4 mt-5">
            <div className="row">
              <img
                className="col-md-4"
                width={40}
                height={100}
                src="./Img/Healing Garden Logo.png"
              />
              <p className="footertext sourc">Reconnect With Yourself</p>
              <div className="row mt-5">
                <button className="col-md-10 join-btn p-2">
                  <SiWhatsapp className="fs-3 me-2 m-auto" />
                  <span className="join-btn1 m-auto">
                    {" "}
                    Join Our WhatsApp Channel
                  </span>
                </button>
              </div>

              <div className="row mt-5">
                <a
                  className="col-md-2 footer_icons footertext"
                  href="https://www.facebook.com/HealingGardenForAll/photos/a.623622438104057/782822768850689/?type=3&_rdr"
                >
                  <BsFacebook />
                </a>
                <a
                  className="col-md-2 footer_icons footertext"
                  href="https://www.instagram.com/healinggardenindia/"
                >
                  <SlSocialInstagram />
                </a>

                <a
                  className="col-md-2 footer_icons footertext"
                  href="https://www.youtube.com/@HealingGardenIndia"
                >
                  <IoLogoYoutube />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-2 mt-5 ">
            <p className="footertext">
              {" "}
              <a href="/" className="footertext">
                Home
              </a>
            </p>
            <p className="footertext">
              {" "}
              <a href="about" className="footertext">
                About Us
              </a>
            </p>
            <p className="footertext">
              {" "}
              <a href="categorylist" className="footertext">
                Workshops Categories
              </a>
            </p>
            <p className="footertext">
              {" "}
              <a href="approach" className="footertext">
                Approach
              </a>
            </p>
            <p className="footertext">
              {" "}
              <a href="galary" className="footertext">
                Gallery
              </a>
            </p>
            <p className="footertext">
              {" "}
              <a href="private-parties" className="footertext">
                Private Parties
              </a>
            </p>
            <p className="footertext">
              <a href="individual" className="footertext">
                For Individuals
              </a>
            </p>
          </div>
          <div className="col-md-2 mt-5">
            <p className="footertext">
              {" "}
              <a href="client-served" className="footertext">
                Clients Served
              </a>
            </p>
            <p className="footertext">
              {" "}
              <a href="testimonials" className="footertext">
                Testimonials
              </a>
            </p>
            <p className="footertext">
              {" "}
              <a href="careers" className="footertext">
                Career
              </a>
            </p>
            <p className="footertext">
              {" "}
              <a href="volunteer" className="footertext">
                Volunteer
              </a>
            </p>
            <p className="footertext">
              {" "}
              <a href="blog" className="footertext">
                Blog
              </a>
            </p>
            <p className="footertext">
              <a href="faq" className="footertext">
                FAQ
              </a>
            </p>
            <p className="footertext">
              {" "}
              <a href="contact-us" className="footertext">
                Contact Us
              </a>
            </p>
          </div>

          <div className="col-md-3 ">
            <div className="row">
              <img className="col-md-6 m-auto" src="./events/logo.png" />
            </div>
            <div className="row m-auto mt-5">
              <button className="col-md-12 m-auto footer-proposal p-1">
                <span className="footer-proposal1 m-auto me-2">
                  {" "}
                  Request A Proposal{" "}
                </span>
                <MdOutlineKeyboardDoubleArrowRight className="skipp m-auto p-2" />
              </button>
            </div>
            <div className="row mt-3 m-auto">
              <IoIosCall className="col-md-2 m-auto  fs-3" />
              <span className="col-md-2 m-auto footertext">9620520200</span>
              <span className="col-md-8 m-auto"></span>
            </div>
            <div className="row mt-3 m-auto">
              <TfiEmail className="col-md-2 m-auto  fs-3" />
              <span className="col-md-2 m-auto footertext">
                Support@Healinggarden.co.in
              </span>
              <span className="col-md-8 m-auto"></span>
            </div>
          </div>
          <hr className="mt-3"></hr>
          <div className="row text-white p-2">
            <div className="col-md-10 ">
              {" "}
              <div className=" d-flex ">
                <li className="list m-auto">Terms & Condition </li>
                <li className="list m-auto">|</li>
                <li className="list m-auto">Privacy Policy</li>
                <li className="list m-auto">|</li>
                <li className="list m-auto">Cancellation & Refund</li>
                <li className="list m-auto">|</li>
                <li className="list m-auto">
                  {" "}
                  <BiSolidCopyright className="me-1 m-auto" />
                  <span className="m-auto">
                    Healing Garden 2024 Developed by Nakshatra Namaha Creations
                  </span>
                </li>
              </div>
            </div>
            <div className="col-md-3">
              <img
                width={30}
                height={30}
                className="stikylogo"
                src="./events/whatslogo.png"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
