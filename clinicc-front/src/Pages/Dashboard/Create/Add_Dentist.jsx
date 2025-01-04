import React, { useEffect, useState } from "react";
import '../CSS/Add.css';
import dentist from "../../../Assets/dentisti.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../GlobalFiles/Sidebar";
import "../CSS/Edit.css";

const notify = (text) => toast(text);

const AddDentist = () => {
  const token = localStorage.getItem("accessToken");
  
  const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dentistValue, setDentistValue] = useState({
      emri: "",
      mbiemri: "",
      mosha: "",
      nrTelefonit: "",
      email: "",
      specializimi: "",
      oraFillimit: "",
      oraMbarimit: "",
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

  const HandleDentistChange = (e) => {
    setDentistValue({ ...dentistValue, [e.target.name]: e.target.value });
  };

  const HandleDentistSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `https://localhost:7201/api/Dentist`,
        dentistValue,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "Dentist already exists") {
        notify("Dentist Already Exists");
      } else {
        setDentistValue({
            emri: "",
            mbiemri: "",
            mosha: "",
            nrTelefonit: "",
            email: "",
            specializimi: "",
            oraFillimit: "",
            oraMbarimit: "",
            password: "",
            departmentId: "",
        });
        notify("Dentist added successfully");
      }
    } catch (error) {
      console.error("Failed to add Dentist:", error);
      notify("Failed to add Dentist");
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
            <h1>Add Dentist</h1>
            <img src={dentist} alt="doctor" className="avatarimg" />
            <form onSubmit={HandleDentistSubmit}>
              <div>
                <label>Name: </label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Name"
                    name="emri"
                    value={dentistValue.emri}
                    onChange={HandleDentistChange}
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
                    value={dentistValue.mbiemri}
                    onChange={HandleDentistChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Age: </label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Age"
                    name="mosha"
                    value={dentistValue.mosha}
                    onChange={HandleDentistChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Phone Number: </label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="PhoneNumber"
                    name="nrTelefonit"
                    value={dentistValue.nrTelefonit}
                    onChange={HandleDentistChange}
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
                    value={dentistValue.email}
                    onChange={HandleDentistChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Specializimi: </label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Specializimi"
                    name="specializimi"
                    value={dentistValue.specializimi}
                    onChange={HandleDentistChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Ora Fillimit: </label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="hh:mm:ss"
                    name="oraFillimit"
                    value={dentistValue.oraFillimit}
                    onChange={HandleDentistChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Ora Mbarimit </label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="hh:mm:ss"
                    name="oraMbarimit"
                    value={dentistValue.oraMbarimit}
                    onChange={HandleDentistChange}
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
                    value={dentistValue.password}
                    onChange={HandleDentistChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Select Department</label>
                <div className="inputdiv">
                  <select
                    name="departmentId"
                    value={dentistValue.departmentId}
                    onChange={HandleDentistChange}
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

export default AddDentist;
