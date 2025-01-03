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

const EditPrescription = () => {
  const { id } = useParams(); // Get the patient ID from the URL
  const token = localStorage.getItem("accessToken"); // Retrieve the token from localStorage

  const [formData, setFormData] = useState({
    prescriptionId: id,
    diagnoza: "",
    medicina: "",
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
    const fetchPrescription = async () => {
      try {
        const response = await axios.get(`https://localhost:7201/api/Prescription/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setFormData({
          prescriptionId: data.prescriptionId,
          diagnoza: data.diagnoza || "",
          medicina: data.medicina || "",
          patientId: data.patientId ,
          dentistId:data.dentistId,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch Prescription data:", error);
        message.error("Failed to load Prescription data.");
        setLoading(false);
      }
    };

    fetchPrescription();
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
        `https://localhost:7201/api/Prescription/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        console.log(response);
        message.success("Prescription updated successfully.");
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
              message.error("Failed to update Prescription.");
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
                <p>Diagnoza: {formData.diagnoza}</p>
              </div>
              <div className="singleitemdiv">
                <MdSick className="singledivicons" />
                <p>Medicina: {formData.medicina}</p>
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
                  <label htmlFor="diagnoza">Diagnosis</label>
                  <input
                    name="diagnoza"
                    value={formData.diagnoza}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Diagnosis"
                  />
                  <label htmlFor="medicina">Medicina</label>
                  <input
                    name="medicina"
                    value={formData.medicina}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="medicina"
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

export default EditPrescription;
