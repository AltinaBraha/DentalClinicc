import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Components/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Components/Footer/Footer";
import "../Pages/CSS/Appointment.css";
import termini from "../Assets/termini.png";
import backgroundImage from "../Assets/appointmentImg.png";

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

  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [terminiValue, setTerminiValue] = useState({
    data: "",
    ceshtja: "",
    ora: "",
    email: "",
    patientId: patient1.patientId,
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

  const handleTerminiChange = (e) => {
    setTerminiValue({ ...terminiValue, [e.target.name]: e.target.value });
  };

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

      if (response.data.message === "Termini already exists") {
        notify("Appointment Already Exists");
      } else {
        setTerminiValue({
          data: "",
          ceshtja: "",
          ora: "",
          email: "",
          patientId: patient1.patientId,
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
      <Navbar />
      <div style={{ position: "fixed", top: 0, right: 0, zIndex: 9999 }}>
  <ToastContainer />
</div>

      <div
        className="appointment-page"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="content-container">
          {/* Left Side */}
          <div className="text-container">
            <h1>The Complete Dental Examination</h1>
            <p>
              Get a free healthcare examination for your teeth. Just fill in the
              form and we'll contact you back.
            </p>
            <div className="benefit-box">
              <h2>Benefit No. 1</h2>
              <p>Add a description of your offer and key benefits.</p>
            </div>
            <div className="benefit-box">
              <h2>Benefit No. 2</h2>
              <p>Add a description of your offer and key benefits.</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="appointment-form">
            <h1>Book an Appointment</h1>
            <img src={termini} alt="doctor" className="avatarimg" />
            <form onSubmit={handleTerminiSubmit}>
              <input
                type="date"
                name="data"
                value={terminiValue.data}
                onChange={handleTerminiChange}
                required
              />
              <input
                type="text"
                name="ceshtja"
                placeholder="Reason"
                value={terminiValue.ceshtja}
                onChange={handleTerminiChange}
                required
              />
              <input
                type="text"
                name="ora"
                placeholder="hh:mm:ss"
                value={terminiValue.ora}
                onChange={handleTerminiChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={terminiValue.email}
                onChange={handleTerminiChange}
                required
              />
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
              <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Book Now"}
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
