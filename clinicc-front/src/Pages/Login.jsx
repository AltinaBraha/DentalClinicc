import React, { useState } from "react";
import { Radio } from "antd";
import "react-toastify/dist/ReactToastify.css";
import logo from "../Assets/logoo.png";
import banner from "../Assets/banner.png";
import "./CSS/Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const notify = (text) => toast(text);

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [placement, setPlacement] = useState("Admin");
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiEndpoints = {
      Admin: "https://localhost:7201/api/Admin/login",
      Dentist: "https://localhost:7201/api/Dentist/login",
      Patient: "https://localhost:7201/api/Patient/login",
    };

    const endpoint = apiEndpoints[placement];

    try {
      const response = await axios.post(endpoint, formValue);
      setLoading(false);
      notify(response.data.message);

      console.log(response.data);
      const { accessToken, refreshToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log(accessToken);
      console.log(refreshToken);

      navigate("/Home");
      setFormValue({ email: "", password: "" });
    } catch (error) {
      setLoading(false);
      notify(error.response?.data?.message || "An error occurred");
    }
  };

  const placementChange = (e) => {
    setPlacement(e.target.value);
  };

  return (
    <>
      <ToastContainer />
      <div className="mainLoginPage">
        <div className="leftside">
          <img src={banner} alt="banner" />
        </div>
        <div className="rightside">
          <h1>Login</h1>
          <div className="Profileimg">
            <img src={logo} alt="profile" />
          </div>
          <div>
            <h3>Select Role</h3>
            <Radio.Group onChange={placementChange} value={placement}>
              <Radio value="Admin">Admin</Radio>
              <Radio value="Dentist">Dentist</Radio>
              <Radio value="Patient">Patient</Radio>
            </Radio.Group>
            <form onSubmit={handleSubmit}>
              <h3>Email</h3>
              <input
                type="email"
                name="email"
                value={formValue.email}
                onChange={handleChange}
                required
              />
              <h3>Password</h3>
              <input
                type="password"
                name="password"
                value={formValue.password}
                onChange={handleChange}
                required
              />
              <button type="submit">{loading ? "Loading..." : "Submit"}</button>
              <h4 style={{ marginTop: "10px" }}>Don't have an account?</h4>
              <a href="/">Click here</a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
