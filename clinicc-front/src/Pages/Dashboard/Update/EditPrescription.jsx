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

const EditPrescription = () => {
  const { id } = useParams(); 
  const token = localStorage.getItem("accessToken"); 

  const [formData, setFormData] = useState({
    prescriptionId: id,
    diagnoza: "",
    medicina: "",
    patientId: "",
    dentistId: "",
  });

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [patients, setPatients] = useState([]);
  const [dentists, setDentists] = useState([]);

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

    if (token) {
      fetchPatients();
      fetchDentists();
    }
  }, [token]);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axios.get(`https://localhost:7201/api/Prescription/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        setFormData({
          prescriptionId: data.prescriptionId,
          diagnoza: data.diagnoza || "",
          medicina: data.medicina || "",
          patientId: data.patientId,
          dentistId: data.dentistId,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch prescription data:", error);
        message.error("Failed to load prescription data.");
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [id, token]);

  const handleDropdownChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const showModal = () => setOpen(true);

  const handleCancel = () => setOpen(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      await axios.put(
        `https://localhost:7201/api/Prescription/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success("Prescription updated successfully.");
      setOpen(false);
    } catch (error) {
      console.error("Failed to update prescription:", error);
      message.error("Failed to update prescription.");
    }
  };

  if (loading) return <p>Loading...</p>;

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
                <p>Diagnosis: {formData.diagnoza}</p>
              </div>
              <div className="singleitemdiv">
                <FaTimes className="singledivicons" />
                <p>Medicine: {formData.medicina}</p>
              </div>
              <div className="singleitemdiv">
                <MdSick className="singledivicons" />
                <p>Patient: {formData.patientId}</p>
              </div>
              <div className="singleitemdiv">
                <MdEmail className="singledivicons" />
                <p>Dentist: {formData.dentistId}</p>
              </div>
              <div className="singleitemdiv">
                <button onClick={showModal}>
                  <AiFillEdit />
                  Edit
                </button>
              </div>
              <Modal
                title="Edit Prescription"
                open={open}
                confirmLoading={confirmLoading}
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
                  <label htmlFor="diagnoza">Diagnosis</label>
                  <input
                    name="diagnoza"
                    value={formData.diagnoza}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Diagnosis"
                  />
                  <label htmlFor="medicina">Medicine</label>
                  <input
                    name="medicina"
                    value={formData.medicina}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Medicine"
                  />
                  <label htmlFor="patientId">Select Patient</label>
                  <Select
                    name="patientId"
                    value={formData.patientId}
                    onChange={(value) => handleDropdownChange("patientId", value)}
                    placeholder="Select Patient"
                    style={{ width: "100%" }}
                  >
                    {patients.map((patient) => (
                      <Select.Option key={patient.patientId} value={patient.patientId}>
                        {patient.emri} {patient.mbiemri}
                      </Select.Option>
                    ))}
                  </Select>
                  <label htmlFor="dentistId">Select Dentist</label>
                  <Select
                    name="dentistId"
                    value={formData.dentistId}
                    onChange={(value) => handleDropdownChange("dentistId", value)}
                    placeholder="Select Dentist"
                    style={{ width: "100%" }}
                  >
                    {dentists.map((dentist) => (
                      <Select.Option key={dentist.dentistId} value={dentist.dentistId}>
                        {dentist.emri} {dentist.mbiemri}
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

export default EditPrescription;
