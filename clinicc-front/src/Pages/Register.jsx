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
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


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
      notify("Patient registered successfully!"); 

      setFormValue({
        emri: "",
        mbiemri: "",
        mosha: "",
        nrTelefonit: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/Login"); 
      }, 2000); 
    } catch (error) {
      setLoading(false);
      console.error("Error response:", error.response);
      notify(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
    <div style={{ position: "fixed", top: 0, right: 0, zIndex: 9999 }}>
  <ToastContainer />
</div>

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
              <div className="form-row">
              <h5>Name:</h5>
              <input
                type="text"
                name="emri"
                value={formValue.emri}
                onChange={handleChange}
                required
              />
              </div>

              <div className="form-row">
              <h5>Surname:</h5>
              <input
                type="text"
                name="mbiemri"
                value={formValue.mbiemri}
                onChange={handleChange}
                required
              />
              </div>

              <div className="form-row">
              <h5>Age:</h5>
              <input
                type="number"
                name="mosha"
                value={formValue.mosha}
                onChange={handleChange}
                required
              />
              </div>

              <div className="form-row">
              <h5>Phone Number:</h5>
              <input
                type="number"
                name="nrTelefonit"
                value={formValue.nrTelefonit}
                onChange={handleChange}
                required
              />
              </div>

              <div className="form-row">
              <h5>Email:</h5>
              <input
                type="email"
                name="email"
                value={formValue.email}
                onChange={handleChange}
                required
              />
              </div>

              <div className="form-row">
              <h5>Password:</h5>
              <input
                type="password"
                name="password"
                value={formValue.password}
                onChange={handleChange}
                required
              />
              </div>

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
