import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Form } from "react-bootstrap";
import { IoCallOutline } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import RequestProposal from "../Request";

export default function Header() {
  const [isSticky, setSticky] = useState(false);
  const [categoryData, setcategoryData] = useState([]);
  const [Workshop, setWorkshop] = useState([]);
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
    getAllWorkShop();
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
    if (searchValue) {
      let value = searchValue.toLowerCase();
      let filterData = response.data.data.filter((ele) =>
        ele.productName?.includes(value)
      );
      setWorkshop(filterData);
    } else {
      setWorkshop(response.data.data);
    }
  };

  const userDataStr = localStorage.getItem("userdata");
  const userid = JSON.parse(userDataStr)?._id;
  const [AllOrderData, setAllOrderData] = useState([]);
  useEffect(() => {
    if (userid) {
      getorderdata();
    }
  }, [userid]);

  const getorderdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8002/api/order/getallorder"
      );

      setAllOrderData(response.data.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };
  const [Search, setSearch] = useState(false);
  const [searchValue, setsearchValue] = useState("");
  const handleFilterProduct = (data) => {
    setsearchValue(data.workshopTitle);
  };
  return (
    <>
      <div
        className={`row p-2 m-auto Sticky-header ${isSticky ? "sticky" : ""}`}
      >
        <p
          className={`main_heading m-auto text-center f-25 ${
            isSticky ? "hide" : ""
          }`}
        >
          Mental & Social Wellness!
        </p>
      </div>

      <div className={`row m-auto subheading p-2 ${isSticky ? "sticky" : ""}`}>
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand href="/">
            <img src="./Img/Healing Garden Logo.png" width={50} height={50} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link href="/about" className="text-li">
                About
              </Nav.Link>
              <Nav.Link className="text-li p-0 m-auto">
                <NavDropdown
                  title="Workshops"
                  className="text-li"
                  id="collapsible-nav-dropdown"
                >
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
              </Nav.Link>

              <Nav.Link href="/gallery" className="text-li m-auto">
                Gallery
              </Nav.Link>
              <Nav.Link href="individual" className="text-li m-auto">
                For Individual
              </Nav.Link>
              <Nav.Link href="corporate" className="text-li m-auto">
                For Corporate
              </Nav.Link>

              <Nav.Link className="text-li m-auto  p-0 m-0 ">
                <NavDropdown
                  title="More"
                  className="text-li"
                  id="navbarScrollingDropdown"
                ></NavDropdown>
              </Nav.Link>
              <Nav.Link href="/contact-us" className="text-li m-auto">
                Contact Us
              </Nav.Link>
              <Nav.Link href="" className="position-re">
                {/* {!Search ? (
                  <i className="pi pi-search" onClick={() => setSearch(true)} />
                ) : (
                  <>
                    <Form.Control
                      onChange={(e) => setsearchValue(e.target.value)}
                      type="text"
                      placeholder="Search here!"
                      className="p-1 col-sm-5 col-md-6  col-7 position-re search"
                      value={searchValue}
                    />
                    <span
                      className="close_btn"
                      onClick={() => setSearch(false)}
                    >
                      X
                    </span>
                  </>
                )} */}
                <Form.Control
                  onChange={(e) => setsearchValue(e.target.value)}
                  type="text"
                  placeholder="Search here!"
                  className="p-1 col-sm-5 col-md-6  col-7 position-re search"
                  value={searchValue}
                />
              </Nav.Link>
              {searchValue.length > 0 && (
                <div className="search-dropdon shadow p-2">
                  {Workshop?.map((ele) => (
                    <li
                      className="drop-down p-2"
                      onClick={() => handleFilterProduct(ele)}
                    >
                      {ele.workshopTitle}
                    </li>
                  ))}
                </div>
              )}
            </Nav>

            <Nav>
              <Nav.Link
                onClick={() => setOpen(true)}
                className="request-proposal  text-center text-li  p-1"
              >
                Request A Proposal
              </Nav.Link>

              <Nav.Link
                eventKey={2}
                href="tel:+9620520200"
                className="ms-2 text-li"
              >
                <IoCallOutline /> 9620520200
              </Nav.Link>
              <Nav.Link
                className="text-li"
                eventKey={2}
                href={`${AllOrderData.length === 0 ? "/individual" : "/cart"} `}
              >
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
