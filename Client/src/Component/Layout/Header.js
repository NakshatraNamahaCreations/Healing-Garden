import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { IoCallOutline } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
export default function Header() {
  const [isSticky, setSticky] = useState(false);
  const [categoryData, setcategoryData] = useState([]);
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

  const [open, setOpen] = useState(false);

  const [Workshop, setWorkshop] = useState([]);
  let initialdat = {
    companyname: "",
    mobileno: "",
    email: "",
    workshop: "",
    max: "",
    message: "",
    Username: "",
  };
  const [RequestData, setRequestData] = useState(initialdat);
  useEffect(() => {
    getAllWorkShop();
  }, []);
  const handlRequestSubmit = async () => {
    try {
      let config = {
        url: "https://api.healinggarden.co.in/api/proposal/addproposal",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          companyname: RequestData?.companyname,
          mobileno: RequestData?.mobileno,
          email: RequestData?.email,
          workshop: RequestData?.workshop,
          max: RequestData?.max,
          message: RequestData?.message,
          Username:RequestData.Username,
        },
      };
      let res = await axios(config);

      if (res.status === 200) {
        console.log(res, "res.data");
        localStorage.setItem("userdata", JSON.stringify(res.data));
        window.location.href = "/";
      }
    } catch (error) {
      alert("An error occurred during login. Please try again.");
    }
  };
  const handleChange = (e) => {
    let { value, name } = e.target;
    setRequestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getAllWorkShop = async () => {
    let response = await axios.get(
      "https://api.healinggarden.co.in/api/workshop/getallProduct"
    );
    setWorkshop(response.data.data);
  };
  console.log(Workshop);
  console.log(RequestData);
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
              <Nav.Link href="/Galary" className="ms-2">
                Gallery
              </Nav.Link>
              <Nav.Link href="individual" className="ms-2">
                For Individual
              </Nav.Link>
              <NavDropdown title="More" id="navbarScrollingDropdown">
                <NavDropdown.Item href="">Action</NavDropdown.Item>
                <NavDropdown.Item href="">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="">Something else here</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="" className="ms-2">
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

        <Modal show={open} onHide={() => setOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Request Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label> Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="User name"
                  autoFocus
                  name="Username"
                  value={RequestData?.Username}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Company name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="company name"
                  autoFocus
                  name="companyname"
                  value={RequestData?.companyname}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mobile number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mobile number"
                  autoFocus
                  name="mobileno"
                  value={RequestData?.mobileno}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  autoFocus
                  name="email"
                  value={RequestData?.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Select
                  type="text"
                  className="form-control"
                  aria-describedby="basic-addon1"
                  name="workshop"
                  value={RequestData?.workshop}
                  onChange={handleChange}
                >
                  <option>Select Workshop</option>
                  {Workshop?.map((ele) => {
                    return (
                      <option value={ele.workshopTitle}>
                        {ele.workshopTitle}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Select
                  type="text"
                  className="form-control"
                  aria-describedby="basic-addon1"
                  name="max"
                  value={RequestData?.max}
                  onChange={handleChange}
                >
                  <option>Select Pax </option>
                  <option value={"50-100"}>50-100 </option>
                  <option value={"150-300"}>150-200 </option>
                  <option value={"300-400"}>300-400 </option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Message </Form.Label>
                <Form.Control
                  value={RequestData.message}
                  onChange={handleChange}
                  as="textarea"
                  name="message"
                  rows={3}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="filter row " onClick={handlRequestSubmit}>
              Submit{" "}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
