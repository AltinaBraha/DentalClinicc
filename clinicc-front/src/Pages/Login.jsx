import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../Assets/logoo.png";
import banner from "../Assets/banner.png";
import "./CSS/Login.css";

const notify = (text) => toast(text);

const Login = () => {
  const [loading, setLoading] = useState(false);
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

    const apiEndpoints = [
      { role: "Admin", url: "https://localhost:7201/api/Admin/login" },
      { role: "Dentist", url: "https://localhost:7201/api/Dentist/login" },
      { role: "Patient", url: "https://localhost:7201/api/Patient/login" },
    ];

    for (const endpoint of apiEndpoints) {
      try {
        const response = await axios.post(endpoint.url, formValue);

        setLoading(false);
        notify(`Logged in as ${endpoint.role}`);

        const { accessToken, refreshToken } = response.data.data;
        const { patient, admin, dentist } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", endpoint.role);
        if (patient) {
          localStorage.setItem("patient", JSON.stringify(patient));
        }
        if (admin) {
          localStorage.setItem("admin", JSON.stringify(admin));
        }
        if (dentist) {
          localStorage.setItem("dentist", JSON.stringify(dentist));
        }

        console.log(response.data);
        console.log(patient);
        console.log(`Logged in as ${endpoint.role}`);
        navigate("/Home");
        setFormValue({ email: "", password: "" });
        return;
      } catch (error) {
        console.error(`Failed to login as ${endpoint.role}`, error.response?.data);
        
      }
    }

    setLoading(false);
    notify("Login failed. Please check your credentials.");
  };

  return (
    <>
    <div style={{ position: "fixed", top: 0, right: 0, zIndex: 9999 }}>
  <ToastContainer />
</div>

      <div className="mainLoginPage">
        <div className="leftside">
          <img src={banner} alt="banner" />
        </div>
        <div className="rightside">
          <h1>Login</h1>
          <div className="Profileimg">
            <img src={logo} alt="profile" />
          </div>
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
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </button>
            <h4 style={{ marginTop: "10px" }}>Don't have an account?</h4>
            <a href="/">Click here</a>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
