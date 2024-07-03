import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
// import "../login.css";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [emailOrName, setEmailOrName] = useState("");
  const [password, setpassword] = useState("");
  const Login = async () => {
    try {
      let config = {
        url: "https://api.healinggarden.co.in/api/user/loginuser",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          email: emailOrName,
          password: password,
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

  return (
    <div className="row m-auto " style={{ height: "100vh" }}>
      <div className="col-md-4 shadow m-auto text-center p-2">
        <h4 className="mt-3 ">LOGIN TO YOUR ACCOUNT</h4>
        <div className="inputlogin " style={{ marginTop: "50px" }}>
          <div
            class="input-group mb-4 mt-3"
            style={{ display: "block", width: "100%" }}
          >
            <Form.Control
              type="email"
              className="form-control"
              placeholder="Email"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{
                width: "60%",
                marginLeft: "20%",
                borderRadius: "3px",
                marginTop: "10px",
              }}
              onChange={(e) => setEmailOrName(e.target.value)}
            />
            <Form.Control
              type="password"
              className="form-control mt-4"
              placeholder="Password"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{
                width: "60%",
                marginLeft: "20%",
                borderRadius: "3px",
              }}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
        </div>
        <div className="text-center pt-3">
          <Button
            style={{
              width: "60%",
              backgroundColor: "#10b981",
              border: "none",
              fontWeight: "bold",
            }}
            onClick={Login}
          >
            Login
          </Button>
        </div>
        OR
        <p
          style={{
            fontSize: "12px",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          <Link to="/register">
            are you new to healing garden please login.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
