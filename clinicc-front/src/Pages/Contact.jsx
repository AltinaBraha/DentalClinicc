import React, { useState } from "react";
import axios from "axios";
import "./CSS/Contact.css";
import Navbar from '../Components/Navbar/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../Components/Footer/Footer';

const Contact = () => {
  const patient = (() => {
    try {
      return JSON.parse(localStorage.getItem("patient")) || {};
    } catch {
      console.error("Invalid patient data in localStorage");
      return {};
    }
  })();
  const role = localStorage.getItem("role");
  
  const [formData, setFormData] = useState({
    mesazhi: "",
    messageDate: "",
    patientId: patient.patientId,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    if (!token || role !== "Patient") {
      setErrorMessage(
        role !== "Patient"
          ? "Ju nuk jeni të autorizuar të përdorni këtë formë."
          : "Ju nuk jeni autentikuar. Ju lutem kyçuni."
      );
      return;
    }

    try {
      await axios.post(
        "https://localhost:7201/api/Contact/add-contact",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Mesazhi u dërgua me sukses!");
      setErrorMessage("");
      setFormData({
        mesazhi: "",
        messageDate: "",
        patientId: patient.patientId,

      });
    } catch (error) {
      console.error("Gabim gjatë dërgimit të mesazhit:", error.response?.data);
      setSuccessMessage("");
      setErrorMessage("Dështoi dërgimi i mesazhit. Ju lutem provoni përsëri.");
    }
  };

  return (

    <>
            <Navbar />
        <div className="all">
          {/* Pjesa 1 */}
          <div className="part1">
            <div className="part1_tx">
              <h1>ℂ𝕆ℕ𝕋𝔸ℂ𝕋 𝕌𝕊</h1>
              <h2>Contact Information</h2>
            </div>
          </div>

          {/* Pjesa 2 */}
          <div className="part2">
            <div className="part2_box">
              <div className="part2_box_tx">
                <i className="fa-solid fa-phone"></i>
                <h2>+383 44 111 222</h2>
                <p>We're here to help you achieve a healthy smile!</p>
              </div>
            </div>
            <div className="part2_box">
              <div className="part2_box_tx">
                <i className="fa-solid fa-envelope"></i>
                <h2>dentalclinic@gmail.com</h2>
                <p>Contact us for any dental inquiries or appointments</p>
              </div>
            </div>
            <div className="part2_box3">
              <div className="part2_box_tx">
                <i className="fa-solid fa-location-dot"></i>
                <h2>Kosova, Prishtinë</h2>
                <p>Visit us for quality dental care and consultations.</p>
              </div>
            </div>
          </div>

          {/* Pjesa 3 */}
          <div className="part3">
            <div className="part3_left">
              <div className="part3_left_tx">
                <h1>𝔽𝕆ℝ𝕄</h1>
                <h2>Contact Us!</h2>
                <p>
                At our dental clinic, we prioritize your oral health and comfort.
                 Whether you need a routine check-up, advanced dental treatments,
                  or simply have questions, we’re here to assist you.  
                Feel free to reach out to schedule an appointment or learn more about our services.
                 Your smile is our top priority!
                </p>
              </div>
            </div>
            <div className="part3_right">
              <form onSubmit={handleSubmit}>
                <textarea
                  name="mesazhi"
                  placeholder="Mesazhi"
                  value={formData.mesazhi}
                  onChange={handleChange}
                  required
                ></textarea>
                <input
                  type="date"
                  name="messageDate"
                  value={formData.messageDate}
                  onChange={handleChange}
                  required
                />
                <button type="submit">Dërgo</button>
              </form>
              {successMessage && <p className="success">{successMessage}</p>}
              {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
          </div>

          {/* Pjesa 4 */}
          <div className="part4">
            <iframe
              src="https://www.google.com/maps/embed?... (same iframe link)"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <Footer />
    </>
  );
};

export default Contact;
