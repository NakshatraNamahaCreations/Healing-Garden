import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Form } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";
import axios from "axios";

function RequestProposal({ open, setOpen }) {
  // const [open, setOpen] = useState(false);

  const [Workshop, setWorkshop] = useState([]);
  let initialdat = {
    companyname: "",
    mobileno: "",
    email: "",
    workshop: "",
    max: "",
    message: "",
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
        },
      };
      let res = await axios(config);

      if (res.status === 200) {
        alert("Request sent ");
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

  return (
    <Modal show={open} onHide={() => setOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Request Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
                  <option value={ele.workshopTitle}>{ele.workshopTitle}</option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
  );
}

export default RequestProposal;
