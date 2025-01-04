import React, { useEffect, useState } from "react";
import '../CSS/Add.css';
import admin from "../../../Assets/admin.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../GlobalFiles/Sidebar";
import "../CSS/Edit.css";

const notify = (text) => toast(text);

const AddAdmin = () => {
  const token = localStorage.getItem("accessToken");
  
  const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [adminValue, setAdminValue] = useState({
      emri: "",
      mbiemri: "",
      email: "",
      password: "",
      departmentId: "",
    });


    useEffect(() => {
        const fetchDepartments = async () => {
          try {
            const response = await axios.get(`https://localhost:7201/api/Department`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setDepartments(response.data?.$values || []);
          } catch (error) {
            console.error("Failed to fetch Department:", error);
            notify("Failed to fetch Department");
          }
        };
    
        if (token) fetchDepartments();
    }, [token]);

  const HandleAdminChange = (e) => {
    setAdminValue({ ...adminValue, [e.target.name]: e.target.value });
  };

  const HandleAdminSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `https://localhost:7201/api/Admin`,
        adminValue,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "Admin already exists") {
        notify("Admin Already Exists");
      } else {
        setAdminValue({
            emri: "",
            mbiemri: "",
            email: "",
            password: "",
            departmentId: "",
        });
        notify("Admin added successfully");
      }
    } catch (error) {
      console.error("Failed to add Admin:", error);
      notify("Failed to add Admin");
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
            <h1>Add Admin</h1>
            <img src={admin} alt="doctor" className="avatarimg" />
            <form onSubmit={HandleAdminSubmit}>
              <div>
                <label>Name: </label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Name"
                    name="emri"
                    value={adminValue.emri}
                    onChange={HandleAdminChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Surname: </label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Surname"
                    name="mbiemri"
                    value={adminValue.mbiemri}
                    onChange={HandleAdminChange}
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
                    value={adminValue.email}
                    onChange={HandleAdminChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Password: </label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={adminValue.password}
                    onChange={HandleAdminChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Select Department</label>
                <div className="inputdiv">
                  <select
                    name="departmentId"
                    value={adminValue.departmentId}
                    onChange={HandleAdminChange}
                    required
                  >
                    <option value="">Select a Department</option>
                    {departments.map((department) => (
                      <option key={department.departmentId} value={department.departmentId}>
                        {department.emri}{/* Display dentist name */}
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

export default AddAdmin;
