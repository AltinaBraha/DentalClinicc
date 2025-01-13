import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { BsTelephone, BsPersonCircle, BsClock, BsHourglass } from "react-icons/bs";
import { Button, message, Modal } from "antd";
import { useParams } from "react-router-dom";
import Sidebar from "../GlobalFiles/Sidebar";
import "../CSS/Edit.css";

const EditPatient = () => {
  const { id } = useParams(); 
  const token = localStorage.getItem("accessToken"); 

  const [formData, setFormData] = useState({
    patientId: id,
    emri: "",
    mbiemri: "",
    mosha: "",
    nrTelefonit: "",
    email: "",
    imageId: "",
  });

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`https://localhost:7201/api/Patient/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setFormData({
          patientId: data.patientId,
          emri: data.emri || "",
          mbiemri: data.mbiemri || "",
          mosha: data.mosha || "",
          nrTelefonit: data.nrTelefonit || "",
          email: data.email || "",
          imageId:data.imageId,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch patient data:", error);
        message.error("Failed to load patient data.");
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id, token]);

  const success = (text) => {
    messageApi.success(text);
  };

  const error = (text) => {
    messageApi.error(text);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.put(
        `https://localhost:7201/api/Patient/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
            message.success("Profile updated successfully.");
            setOpen(false);
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
              message.error("Failed to update profile.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {contextHolder}
      <div className="container1">
        <Sidebar />
        <div className="AfterSideBar1" style={{ marginLeft: "26%", marginTop: "5%" }}>
          <div className="maindoctorProfile">
            <div className="firstBox" style={{ marginLeft: "-15%" }}>
              <br />
              <div className="singleitemdiv">
                <BsPersonCircle className="singledivicons" />
                <p>Name: {formData.emri}</p>
              </div>
              <div className="singleitemdiv">
                <BsPersonCircle className="singledivicons" />
                <p>Surname: {formData.mbiemri}</p>
              </div>
              <div className="singleitemdiv">
                <BsHourglass className="singledivicons" />
                <p>Age: {formData.mosha}</p>
              </div>
              <div className="singleitemdiv">
                <BsTelephone className="singledivicons" />
                <p>Phone Number: {formData.nrTelefonit}</p>
              </div>
              <div className="singleitemdiv">
                <MdEmail className="singledivicons" />
                <p>Email: {formData.email}</p>
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
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" type="primary" onClick={handleFormSubmit}>
                    Edit
                  </Button>,
                ]}
              >
                <form className="inputForm">
                  <label htmlFor="emri">Name</label>
                  <input
                    name="emri"
                    value={formData.emri}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Name"
                  />
                  <label htmlFor="mbiemri">Surname</label>
                  <input
                    name="mbiemri"
                    value={formData.mbiemri}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Surname"
                  />
                  <label htmlFor="mosha">Age</label>
                  <input
                    name="mosha"
                    value={formData.mosha}
                    onChange={handleFormChange}
                    type="number"
                    placeholder="Age"
                  />
                  <label htmlFor="nrTelefonit">Phone Number</label>
                  <input
                    name="nrTelefonit"
                    value={formData.nrTelefonit}
                    onChange={handleFormChange}
                    type="number"
                    placeholder="Phone Number"
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    type="email"
                    placeholder="Email"
                  />
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPatient;
