import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { MdEmail, MdSick } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Button, message, Modal, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import "../CSS/Edit.css";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (text) => toast(text);

const EditMedicalRecord = () => {
  const { id } = useParams(); // Get the patient ID from the URL
  const token = localStorage.getItem("accessToken"); // Retrieve the token from localStorage

  const [formData, setFormData] = useState({
    medicalRecordId: id,
    pershkrimi: "",
    symptoms: "",
    diagnosis: "",
    results: "",
    patientId: "",
    dentistId: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // Fetch patient data when the component mounts
  useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        const response = await axios.get(`https://localhost:7201/api/MedicalRecord/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setFormData({
          medicalRecordId: data.medicalRecordId,
          pershkrimi: data.pershkrimi || "",
          symptoms: data.symptoms || "",
          diagnosis: data.diagnosis || "",
          results: data.results || "",
          patientId: data.patientId ,
          dentistId:data.dentistId,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch MedicalRecord data:", error);
        message.error("Failed to load MedicalRecord data.");
        setLoading(false);
      }
    };

    fetchMedicalRecord();
  }, [id, token]);

  const success = (text) => {
    messageApi.success(text);
  };

  const error = (text) => {
    messageApi.error(text);
  };
  const handleDropdownChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.put(
        `https://localhost:7201/api/MedicalRecord/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        console.log(response);
        message.success("MedicalRecord updated successfully.");
        setOpen(false);
        navigate("/Patients");
          } catch (error) {
              if (error.response) {
                  console.error("Response data:", error.response.data);
                  console.error("Response status:", error.response.status);
                  console.error("Response headers:", error.response.headers);
              } else if (error.request) {
                  console.error("Request made but no response received:", error.request);
              } else {
                  console.error("Error setting up the request:", error.message);
              }
              message.error("Failed to update MedicalRecord.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <Navbar />
      {contextHolder}
      <div className="container1">
        <div className="AfterSideBar1" style={{ marginLeft: '26%', marginTop: '5%' }}>
          <div className="maindoctorProfile">
            <div className="firstBox">
              <div className="singleitemdiv">
                <MdSick className="singledivicons" />
                <p>Description: {formData.pershkrimi}</p>
              </div>
              <div className="singleitemdiv">
                <MdSick className="singledivicons" />
                <p>Symptoms: {formData.symptoms}</p>
              </div>
              <div className="singleitemdiv">
                <MdSick className="singledivicons" />
                <p>Diagnosis: {formData.diagnosis}</p>
              </div>
              <div className="singleitemdiv">
                <MdSick className="singledivicons" />
                <p>Results: {formData.results}</p>
              </div>
              <div className="singleitemdiv">
                <button onClick={showModal}>
                  <AiFillEdit />
                  Edit
                </button>
              </div>
              <Modal
                title="Edit details"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" onClick={handleFormSubmit}>
                    Edit
                  </Button>,
                ]}
              >
                <form className="inputForm">
                  <label htmlFor="pershkrimi">Description</label>
                  <input
                    name="pershkrimi"
                    value={formData.pershkrimi}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Description"
                  />
                  <label htmlFor="symptoms">Symptoms</label>
                  <input
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Symptoms"
                  />
                  <label htmlFor="diagnosis">Diagnosis</label>
                  <input
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Diagnosis"
                  />
                  <label htmlFor="results">Results</label>
                  <input
                    name="results"
                    value={formData.results}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Results"
                  />
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditMedicalRecord;
