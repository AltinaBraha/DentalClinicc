import React, { useEffect, useState } from "react";
import '../CSS/Add.css';
import department from "../../../Assets/department.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../GlobalFiles/Sidebar";
import "../CSS/Edit.css";

const notify = (text) => toast(text);

const AddDepartment = () => {
  const token = localStorage.getItem("accessToken");
  
  const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [departmentValue, setDepartmentValue] = useState({
      emri: "",
      clinicId: "",
    });


    useEffect(() => {
        const fetchClinics = async () => {
          try {
            const response = await axios.get(`https://localhost:7201/api/Clinic`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setClinics(response.data?.$values || []);
          } catch (error) {
            console.error("Failed to fetch Department:", error);
            notify("Failed to fetch Department");
          }
        };
    
        if (token) fetchClinics();
    }, [token]);

  const HandleDepartmentChange = (e) => {
    setDepartmentValue({ ...departmentValue, [e.target.name]: e.target.value });
  };

  const HandleDepartmentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `https://localhost:7201/api/Department`,
        departmentValue,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "Department already exists") {
        notify("Department Already Exists");
      } else {
        setDepartmentValue({
            emri: "",
            clinicId: "",
        });
        notify("Department added successfully");
      }
    } catch (error) {
      console.error("Failed to add Department:", error);
      notify("Failed to add Department");
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
            <h1>Add Department</h1>
            <img src={department} alt="doctor" className="avatarimg" />
            <form onSubmit={HandleDepartmentSubmit}>
              <div>
                <label>Name: </label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Name"
                    name="emri"
                    value={departmentValue.emri}
                    onChange={HandleDepartmentChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Select Clinic</label>
                <div className="inputdiv">
                  <select
                    name="clinicId"
                    value={departmentValue.clinicId}
                    onChange={HandleDepartmentChange}
                    required
                  >
                    <option value="">Select a Clinic</option>
                    {clinics.map((clinic) => (
                      <option key={clinic.clinicId} value={clinic.clinicId}>
                        {clinic.clinicName}
                      </option>
                    ))}
                  </select>
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

export default AddDepartment;
