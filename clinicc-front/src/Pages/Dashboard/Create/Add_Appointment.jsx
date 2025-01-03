import React, { useEffect, useState } from "react";
import '../CSS/Add.css';
import termini from "../../../Assets/termini.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../GlobalFiles/Sidebar";
import "../CSS/Edit.css";

const notify = (text) => toast(text);

const AddTermini = () => {
  const token = localStorage.getItem("accessToken");
  
  const [dentists, setDentists] = useState([]);
  const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [terminiValue, setTerminiValue] = useState({
      data: "",
      ceshtja: "",
      ora: "",
      email: "",
      patientId: "",
      dentistId: "",
    });


    useEffect(() => {
        const fetchDentists = async () => {
          try {
            const response = await axios.get(`https://localhost:7201/api/Dentist`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setDentists(response.data?.$values || []);
          } catch (error) {
            console.error("Failed to fetch dentists:", error);
            notify("Failed to fetch dentists");
          }
        };
    
        if (token) fetchDentists();
    }, [token]);
    useEffect(() => {
        const fetchPatients = async () => {
          try {
            const response = await axios.get(`https://localhost:7201/api/Patient`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setPatients(response.data?.$values || []);
          } catch (error) {
            console.error("Failed to fetch Patients:", error);
            notify("Failed to fetch Patients");
          }
        };
    
        if (token) fetchPatients();
      }, [token]);

  const HandleTerminiChange = (e) => {
    setTerminiValue({ ...terminiValue, [e.target.name]: e.target.value });
  };

  const HandleTerminiSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `https://localhost:7201/api/Appointments`,
        terminiValue,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "Termini already exists") {
        notify("Appointment Already Exists");
      } else {
        setTerminiValue({
          data: "",
          ceshtja: "",
          ora: "",
          email: "",
          patientId: "",
          dentistId: "",
        });
        notify("Appointment added successfully");
      }
    } catch (error) {
      console.error("Failed to add appointment:", error);
      notify("Failed to add appointment");
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
            <h1>Add Appointment</h1>
            <img src={termini} alt="doctor" className="avatarimg" />
            <form onSubmit={HandleTerminiSubmit}>
              <div>
                <label>Date</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="Date"
                    name="data"
                    value={terminiValue.data}
                    onChange={HandleTerminiChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Reason</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Reason"
                    name="ceshtja"
                    value={terminiValue.ceshtja}
                    onChange={HandleTerminiChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Time</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="hh:mm:ss"
                    name="ora"
                    value={terminiValue.ora}
                    onChange={HandleTerminiChange}
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
                    value={terminiValue.email}
                    onChange={HandleTerminiChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Select Dentist</label>
                <div className="inputdiv">
                  <select
                    name="dentistId"
                    value={terminiValue.dentistId}
                    onChange={HandleTerminiChange}
                    required
                  >
                    <option value="">Select a Dentist</option>
                    {dentists.map((dentist) => (
                      <option key={dentist.dentistId} value={dentist.dentistId}>
                        {dentist.emri} {dentist.mbiemri}{/* Display dentist name */}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label>Select Patient</label>
                <div className="inputdiv">
                  <select
                    name="patientId"
                    value={terminiValue.patientId}
                    onChange={HandleTerminiChange}
                    required
                  >
                    <option value="">Select a Patient</option>
                    {patients.map((patient) => (
                      <option key={patient.patientId} value={patient.patientId}>
                        {patient.emri} {patient.mbiemri}{/* Display patient name */}
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

export default AddTermini;
