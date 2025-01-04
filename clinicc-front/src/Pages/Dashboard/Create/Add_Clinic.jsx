import React, { useEffect, useState } from "react";
import '../CSS/Add.css';
import clinic from "../../../Assets/logoo.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../GlobalFiles/Sidebar";
import "../CSS/Edit.css";

const notify = (text) => toast(text);

const AddClinic = () => {
  const token = localStorage.getItem("accessToken");
  
    const [loading, setLoading] = useState(false);
    const [clinicValue, setClinicValue] = useState({
        clinicName: "",
        location: "",
    });



  const HandleClinicChange = (e) => {
    setClinicValue({ ...clinicValue, [e.target.name]: e.target.value });
  };

  const HandleClinicSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `https://localhost:7201/api/Clinic`,
        clinicValue,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "Clinic already exists") {
        notify("Clinic Already Exists");
      } else {
        setClinicValue({
            clinicName: "",
            location: "",
        });
        notify("Clinic added successfully");
      }
    } catch (error) {
      console.error("Failed to add Clinic:", error);
      notify("Failed to add Clinic");
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
            <h1>Add Clinic</h1>
            <img src={clinic} alt="doctor" className="avatarimg" />
            <form onSubmit={HandleClinicSubmit}>
              <div>
                <label>Name: </label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Name"
                    name="clinicName"
                    value={clinicValue.clinicName}
                    onChange={HandleClinicChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Location: </label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={clinicValue.location}
                    onChange={HandleClinicChange}
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

export default AddClinic;
