import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function RequestProposal({ open, setOpen }) {
  // const [SuccesMessage, setSuccesMessage] = useState(false);

  let initialdat = {
    companyname: "",
    mobileno: "",
    email: "",
    workshop: "",
    max: "",
    message: "",
  };

  const [RequestData, setRequestData] = useState(initialdat);

  const handlRequestSubmit = async () => {
    try {
      let config = {
        url: "http://localhost:8002/api/proposal/addproposal",
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
        setOpen(false);
        // setSuccesMessage(true);
        notify();
      }
    } catch (error) {
      alert("An error occurred during submission. Please try again.");
    }
  };

  const handleChange = (e) => {
    let { value, name } = e.target;
    setRequestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const notify = () =>
    toast(
      "Thank you for contacting us. We will reply to you shortly. Feel free to call/text on WhatsApp at 9620520200."
    );

  return (
    <div className="row m-auto">
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Request A Proposal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full name"
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
            <Form.Label>Company name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company name"
              autoFocus
              name="companyname"
              value={RequestData?.companyname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Company email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              autoFocus
              name="email"
              value={RequestData?.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Tentative Workshop Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Tentative Workshop Date"
              autoFocus
              name="workshop"
              value={RequestData?.workshop}
              onChange={handleChange}
            />
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
              <option>Tentative Participant Count</option>
              <option value={"20-50"}>20-50</option>
              <option value={"50-100"}>50-100</option>
              <option value={"100-200"}>100-200</option>
              <option value={"200-300"}>200-300</option>
              <option value={"300+"}>300+</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              rows={3}
              value={RequestData.message}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <div className="row mb-4">
          <Button
            className="col-md-4 filter m-auto"
            onClick={handlRequestSubmit}
          >
            Submit
          </Button>
        </div>
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default RequestProposal;
