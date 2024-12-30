import React, { useEffect, useState } from "react";
import axios from "axios";
import termini from "../Assets/termini.png";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Components/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Components/Footer/Footer";
import "../Pages/CSS/Appointment.css";

const Appointment = () => {
  const notify = (text) => toast(text);

  const patient1 = (() => {
    try {
      return JSON.parse(localStorage.getItem("patient")) || {};
    } catch {
      console.error("Invalid patient data in localStorage");
      return {};
    }
  })();

  const token = localStorage.getItem("accessToken");
  console.log(token);

  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [terminiValue, setTerminiValue] = useState({
    data: "",
    ceshtja: "",
    ora: "",
    email: "",
    dentistId: "",
    patientId: patient1.patientId,
  });

  // Fetch dentists data
  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await axios.get(`https://localhost:7201/api/Dentist`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dentistsData = response.data?.$values || [];
        console.log(dentistsData);
        setDentists(dentistsData);
      } catch (error) {
        console.error("Failed to fetch dentists:", error);
        notify("Failed to fetch dentists");
      }
    };

    if (token) fetchDentists();
  }, [token]);

  // Handle form input changes
  const handleTerminiChange = (e) => {
    setTerminiValue({ ...terminiValue, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleTerminiSubmit = async (e) => {
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

      const resMessage = response.data.message;
      if (resMessage === "Termini already exists") {
        notify("Appointment Already Exists");
      } else {
        setTerminiValue({
          data: "",
          ceshtja: "",
          ora: "",
          email: "",
          dentistId: "",
          patientId: patient1.patientId,
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
      <Navbar />
      <ToastContainer />
      <div className="container1">
        <div className="AfterSideBar1">
          <div className="Main_Add_Pacient_div">
            <h1>Add Appointment</h1>
            <img src={termini} alt="doctor" className="avatarimg" />
            <form onSubmit={handleTerminiSubmit}>
              <div>
                <label>Date</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="Date"
                    name="data"
                    value={terminiValue.dataT}
                    onChange={handleTerminiChange}
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
                    onChange={handleTerminiChange}
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
                    onChange={handleTerminiChange}
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
                    onChange={handleTerminiChange}
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
                    onChange={handleTerminiChange}
                    required
                  >
                    <option value="">Select a Dentist</option>
                    {dentists.map((dentist) => (
                      <option key={dentist.dentistId} value={dentist.dentistId}>
                        {dentist.emri} {dentist.mbiemri}
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
      <Footer />
    </>
  );
};

export default Appointment;
