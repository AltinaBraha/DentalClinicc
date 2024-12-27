import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import logo from "../Assets/logoo.png";
import banner from "../Assets/banner.png";
import "./CSS/Login.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const notify = (text) => toast(text);

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    emri: "",
    mbiemri: "",
    mosha: "",
    nrTelefonit: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Hook to programmatically navigate to another page

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValue.password !== formValue.confirmPassword) {
      notify("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const apiEndpoint = "https://localhost:7201/api/Patient";

      const payload = {
        Emri: formValue.emri,
        Mbiemri: formValue.mbiemri,
        Mosha: parseInt(formValue.mosha),
        NrTelefonit: parseInt(formValue.nrTelefonit),
        Email: formValue.email,
        Password: formValue.password,
      };

      const response = await axios.post(apiEndpoint, payload);

      setLoading(false);
      notify("Patient registered successfully!"); // Notify the user

      // Clear form fields
      setFormValue({
        emri: "",
        mbiemri: "",
        mosha: "",
        nrTelefonit: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate("/Login"); // Redirect to the login page
      }, 2000); // Delay the redirect to allow the success message to be visible
    } catch (error) {
      setLoading(false);
      console.error("Error response:", error.response);
      notify(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mainRegisterPage">
        <div className="leftside">
          <img src={banner} alt="banner" />
        </div>
        <div className="rightside">
          <h1>Register</h1>
          <div className="Profileimg">
            <img src={logo} alt="profile" />
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <h3>Name</h3>
              <input
                type="text"
                name="emri"
                value={formValue.emri}
                onChange={handleChange}
                required
              />

              <h3>Surname</h3>
              <input
                type="text"
                name="mbiemri"
                value={formValue.mbiemri}
                onChange={handleChange}
                required
              />

              <h3>Age</h3>
              <input
                type="number"
                name="mosha"
                value={formValue.mosha}
                onChange={handleChange}
                required
              />

              <h3>Phone Number</h3>
              <input
                type="number"
                name="nrTelefonit"
                value={formValue.nrTelefonit}
                onChange={handleChange}
                required
              />

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

              <h3>Confirm Password</h3>
              <input
                type="password"
                name="confirmPassword"
                value={formValue.confirmPassword}
                onChange={handleChange}
                required
              />

              <button type="submit">{loading ? "Loading..." : "Register"}</button>
              <h4 style={{ marginTop: "10px" }}>Already have an account?</h4>
              <a href="/Login">Click here</a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
