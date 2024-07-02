import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
// import "../login.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();

  const [FormData, setFormData] = useState({
    usertype: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleRegister = async () => {
    if (
      !FormData.usertype ||
      !FormData.email ||
      !FormData.password ||
      !FormData.phone
    ) {
      return alert("Please fill out all fields");
    }
    try {
      let config = {
        url: "http://api.healinggarden.co.in/api/user/adduser",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          usertype: FormData.usertype,
          email: FormData.email,
          password: FormData.password,
          phone: FormData.phone,
        },
      };
      let res = await axios(config);
      if (res.status === 200 || res.data.success) {
        alert("Signed in Succesfully");
        localStorage.setItem("userdata", JSON.stringify(res.data));
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevedata) => ({
      ...prevedata,
      [name]: value,
    }));
  };

  return (
    <div className="login-container ">
      <div className="right-side">
        <div className="row m-auto text-center shadow p-4">
          <h4 className="mt-3 ">Register</h4>
          <div className="inputlogin ">
            <div
              class="input-group mb-4 mt-3"
              style={{ display: "block", width: "100%" }}
            >
              <Form.Select
                type="text"
                className="form-control"
                placeholder="Name"
                style={{
                  width: "60%",
                  marginLeft: "20%",
                  borderRadius: "3px",
                  marginTop: "10px",
                }}
                name="usertype"
                value={FormData.usertype}
                onChange={handleChange}
              >
                <option value="Individuals">Individuals</option>
                <option value="Corporate">Corporate</option>
              </Form.Select>
              <Form.Control
                type="text"
                className="form-control"
                placeholder="Email"
                style={{
                  width: "60%",
                  marginLeft: "20%",
                  borderRadius: "3px",
                  marginTop: "10px",
                }}
                name="email"
                value={FormData.email}
                onChange={handleChange}
              />
              <Form.Control
                type="password"
                className="form-control mt-4"
                placeholder="Password"
                style={{
                  width: "60%",
                  marginLeft: "20%",
                  borderRadius: "3px",
                }}
                name="password"
                value={FormData.password}
                onChange={handleChange}
              />
              <Form.Control
                type="text"
                className="form-control mt-4"
                placeholder="Confirm Password"
                style={{
                  width: "60%",
                  marginLeft: "20%",
                  borderRadius: "3px",
                }}
                name="phone"
                value={FormData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="text-center pt-3">
            <Button
              style={{
                width: "200px",
                padding: "4px",
                backgroundColor: "#10b981",
                border: "none",
                fontWeight: "bold",
              }}
              onClick={handleRegister}
            >
              Signup
            </Button>
          </div>
          {/* <p
            style={{
              fontSize: "12px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            <b>Never share your login details with anyone.</b>
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
