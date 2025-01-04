import React, { useEffect, useState } from "react";
import '../CSS/Add.css';
import person from "../../../Assets/person.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../GlobalFiles/Sidebar";
import "../CSS/Edit.css";

const notify = (text) => toast(text);

const AddPatient = () => {
  const token = localStorage.getItem("accessToken");
  
    const [loading, setLoading] = useState(false);
    const [patientValue, setPatientValue] = useState({
        emri: "",
        mbiemri: "",
        mosha: "",
        nrTelefonit: "",
        email: "",
        password: "",
    });


  const HandlePatientChange = (e) => {
    setPatientValue({ ...patientValue, [e.target.name]: e.target.value });
  };

  const HandlePatientSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `https://localhost:7201/api/Patient`,
        patientValue,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "Patient already exists") {
        notify("Patient Already Exists");
      } else {
        setPatientValue({
            emri: "",
            mbiemri: "",
            mosha: "",
            nrTelefonit: "",
            email: "",
            password: "",
        });
        notify("Patient added successfully");
      }
    } catch (error) {
      console.error("Failed to add Patient:", error);
      notify("Failed to add Patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div style={{ position: "fixed", top: 0, right: 0, zIndex: 9999 }}>
      <ToastContainer />
    </div>
      <div className="container1">
        <Sidebar />
        <div className="AfterSideBar1">
          <div className="Main_Add_Pacient_div">
            <h1>Add Patient</h1>
            <img src={person} alt="doctor" className="avatarimg" />
            <form onSubmit={HandlePatientSubmit}>
              <div>
                <label>Name: </label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Name"
                    name="emri"
                    value={patientValue.emri}
                    onChange={HandlePatientChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Surname</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Surname"
                    name="mbiemri"
                    value={patientValue.mbiemri}
                    onChange={HandlePatientChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Age</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Age"
                    name="mosha"
                    value={patientValue.mosha}
                    onChange={HandlePatientChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Phone Number: </label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    name="nrTelefonit"
                    value={patientValue.nrTelefonit}
                    onChange={HandlePatientChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Email</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={patientValue.email}
                    onChange={HandlePatientChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Password</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={patientValue.password}
                    onChange={HandlePatientChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"} 
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPatient;
