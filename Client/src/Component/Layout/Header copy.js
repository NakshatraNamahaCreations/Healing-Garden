import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { IoCallOutline } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

import RequestProposal from "../Request";

export default function Header() {
  const [isSticky, setSticky] = useState(false);
  const [categoryData, setcategoryData] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
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
      <div className={`row m-auto Sticky-header ${isSticky ? "sticky" : ""}`}>
        <p
          className={`main_heading text-center f-25 ${isSticky ? "hide" : ""}`}
        >
          Enhancing Mental & Social Wellness!
        </p>
      </div>

      <div className={`row m-auto subheading p-2 ${isSticky ? "sticky" : ""}`}>
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand href="/">
            <img src="./Img/Healing Garden Logo.png" width={50} height={50} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="" className="ms-4">
                {" "}
                <i className="pi pi-search" />
              </Nav.Link>
              <Nav.Link href="/about" className="ms-2">
                About
              </Nav.Link>
              <NavDropdown title="Workshops" id="collapsible-nav-dropdown">
                {categoryData.map((ele) => (
                  <NavDropdown.Item>
                    {" "}
                    <Link
                      className="linktype"
                      state={{ category: ele.category, idd: ele._id }}
                      to="/workshop"
                    >
                      {ele.category}
                    </Link>{" "}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Nav.Link href="/gallery" className="ms-2">
                Gallery
              </Nav.Link>
              <Nav.Link href="individual" className="ms-2">
                For Individual
              </Nav.Link>
              <NavDropdown title="More" id="navbarScrollingDropdown">
                {/* <NavDropdown.Item href="">Action</NavDropdown.Item>
                <NavDropdown.Item href="">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="">Something else here</NavDropdown.Item> */}
              </NavDropdown>
              <Nav.Link href="/contact-us" className="ms-2">
                Contact Us
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                onClick={() => setOpen(true)}
                className="request-proposal m-auto text-center p-2"
              >
                Request A Proposal
              </Nav.Link>
              <Nav.Link href="">
                <IoCallOutline />
              </Nav.Link>
              <Nav.Link eventKey={2} href="">
                9620520200
              </Nav.Link>
              <Nav.Link eventKey={2} href="/cart">
                <FaShoppingBag />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {open && <RequestProposal open={open} setOpen={setOpen} />}
      </div>
    </>
  );
}
