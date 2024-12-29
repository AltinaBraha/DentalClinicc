import React, { useState } from "react";
import axios from "axios";
import "./CSS/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    mesazhi: "",
    messageDate: "",
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

    if (!token) {
      setErrorMessage("Ju nuk jeni autentikuar. Ju lutem kyçuni.");
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
      });
    } catch (error) {
      console.error("Gabim gjatë dërgimit të mesazhit:", error.response?.data);
      setSuccessMessage("");
      setErrorMessage("Dështoi dërgimi i mesazhit. Ju lutem provoni përsëri.");
    }
  };

  return (
    <div className="all">
      {/* Pjesa 1 */}
      <div className="part1">
        <div className="part1_tx">
          <h1>ℂ𝕆ℕ𝕋𝔸ℂ𝕋 𝕌𝕊</h1>
          <h2>Informata të Kontaktit</h2>
        </div>
      </div>

      {/* Pjesa 2 */}
      <div className="part2">
        <div className="part2_box">
          <div className="part2_box_tx">
            <i className="fa-solid fa-phone"></i>
            <h2>+383 49 400 711</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
          </div>
        </div>
        <div className="part2_box">
          <div className="part2_box_tx">
            <i className="fa-solid fa-envelope"></i>
            <h2>dentalclinic@gmail.com</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
          </div>
        </div>
        <div className="part2_box">
          <div className="part2_box_tx">
            <i className="fa-solid fa-location-dot"></i>
            <h2>Kosova, Prishtinë</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
          </div>
        </div>
      </div>

      {/* Pjesa 3 */}
      <div className="part3">
        <div className="part3_left">
          <div className="part3_left_tx">
            <h1>𝔽𝕆ℝ𝕄</h1>
            <h2>Na Kontaktoni!</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
              nihil harum dolorum sapiente, accusamus, molestias impedit
              ducimus itaque perferendis nobis aperiam incidunt veritatis
              consequuntur eaque!
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
  );
};

export default Contact;
