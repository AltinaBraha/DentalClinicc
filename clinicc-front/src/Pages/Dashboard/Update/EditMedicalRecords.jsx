import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { MdEmail, MdSick } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Button, message, Modal, Select } from "antd";
import { useParams } from "react-router-dom";
import Sidebar from "../GlobalFiles/Sidebar";
import "../CSS/Edit.css";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (text) => toast(text);

const EditMedicalRecords = () => {
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

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [dentists, setDentists] = useState([]);
  const [patients, setPatients] = useState([]);

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
        console.error("Failed to fetch patients:", error);
        notify("Failed to fetch patients");
      }
    };

    if (token) fetchPatients();
  }, [token]);

  // Fetch patient data when the component mounts
  useEffect(() => {
    const fetchMedicalRecords = async () => {
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
          symptoms: data.symptoms|| "",
          diagnosis: data.diagnosis || "",
          results: data.results || "",
          patientId: data.patientId,
          dentistId:data.dentistId,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch MedicalRecords data:", error);
        message.error("Failed to load MedicalRecords data.");
        setLoading(false);
      }
    };

    fetchMedicalRecords();
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
            message.success("MedicalRecords updated successfully.");
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
              message.error("Failed to update appointment.");
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
        <div className="AfterSideBar1" style={{ marginLeft: '26%', marginTop: '5%' }}>
          <div className="maindoctorProfile">
            <div className="firstBox">
              <div className="singleitemdiv">
                <BsFillCalendarDateFill className="singledivicons" />
                <p>Pershkrimi: {formData.pershkrimi}</p>
              </div>
              <div className="singleitemdiv">
                <FaTimes className="singledivicons" />
                <p>Symptoms: {formData.symptoms}</p>
              </div>
              <div className="singleitemdiv">
                <MdSick className="singledivicons" />
                <p>Diagnosis: {formData.diagnosis}</p>
              </div>
              <div className="singleitemdiv">
                <MdEmail className="singledivicons" />
                <p>Results: {formData.results}</p>
              </div>
              <div className="singleitemdiv">
                <MdSick className="singledivicons" />
                <p>Patient: {formData.patientId}</p>
              </div>
              <div className="singleitemdiv">
                <MdSick className="singledivicons" />
                <p>Dentist: {formData.dentistId}</p>
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
                  <label htmlFor="pershkrimi">Pershkrimi</label>
                  <input
                    name="pershkrimi"
                    value={formData.pershkrimi}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Pershkrimi"
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
                  <label htmlFor="patientId">Select Patient</label>
                  <Select
                  name="patientId"
                  value={formData.patientId}
                  onChange={(value) => handleDropdownChange('patientId', value)}
                  placeholder="Select Patient"
                  style={{ width: '100%' }}
                  >
                  {patients.map((patient) => (
                    <Select.Option key={patient.patientId} value={patient.patientId}>
                      {patient.emri} {patient.mbiemri}{/* Adjust based on your patient object */}
                    </Select.Option>
                  ))}
                  </Select>
                  <label htmlFor="dentistId">Dentist</label>
                  <Select
                  name="dentistId"
                  value={formData.dentistId}
                  onChange={(value) => handleDropdownChange('dentistId', value)}
                  placeholder="Select Dentist"
                  style={{ width: '100%' }}
                  >
                  {dentists.map((dentist) => (
                    <Select.Option key={dentist.dentistId} value={dentist.dentistId}>
                      {dentist.emri} {dentist.mbiemri}{/* Adjust based on your dentist object */}
                    </Select.Option>
                  ))}
                  </Select>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMedicalRecords;
