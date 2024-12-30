import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/PatientProfile.css";
import { BiTime } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { BsPersonCircle, BsGenderAmbiguous } from "react-icons/bs";
import { FaMoneyBillWave, FaMapMarkedAlt, FaBirthdayCake } from "react-icons/fa";
import { Button, message, Modal, Table } from "antd";
import Navbar from "../Components/Navbar/Navbar";
import Footer from '../Components/Footer/Footer';
import defaultImage from "../Assets/person.png"; // Default placeholder image


const PatientProfile = () => {
    const patient1 = (() => {
        try {
          return JSON.parse(localStorage.getItem("patient")) || {};
        } catch {
          console.error("Invalid patient data in localStorage");
          return {};
        }
      })();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [isUpdatePatientVisible, setIsUpdatePatientVisible] = useState(false);
  const [formData, setFormData] = useState({
    patientId:patient1.patientId,
    emri: "",
    mbiemri: "",
    mosha: "",
    nrTelefonit: "",
    email: "",
    imageId:"",
  });

  useEffect(() => {
    // Fetch patient data
    const fetchPatientData = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Adjust as per your auth mechanism
        console.log(token);
        const response = await axios.get(`https://localhost:7201/api/Patient/${patient1.patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('response.data',response.data);
        const patientData = response.data;
        console.log('patient data',patientData);
        setPatient(patientData);
        setFormData({
            patientId: patientData.patientId,
            emri: patientData.emri,
            mbiemri: patientData.mbiemri,
            mosha: patientData.mosha,
            nrTelefonit: patientData.nrTelefonit,
            email: patientData.email,
            imageId:patientData.imageId,
        });
      } catch (error) {
        console.error("Failed to fetch patient data:", error);
      }
    };

    fetchPatientData();
  }, []);

  useEffect(() => {
    // Fetch patient-related data
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const patientId = patient?.patientId;

        if (!patientId) return;

        const [appointmentsRes, medicalRecordsRes, prescriptionsRes] = await Promise.all([
          axios.get(`https://localhost:7201/api/Appointments/patient/${patientId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`https://localhost:7201/api/MedicalRecord/patient/${patientId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`https://localhost:7201/api/Prescription/patient/${patientId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const appointmentData = appointmentsRes.data["$values"];
        const medicalRecordsData = medicalRecordsRes.data["$values"];
        const prescriptionsData = prescriptionsRes.data["$values"];

        console.log(medicalRecordsData);

        setAppointments(appointmentData);
        setMedicalRecords(medicalRecordsData);
        setPrescriptions(prescriptionsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (patient) fetchData();
  }, [patient]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log(patient.patientId);
      const response = await axios.put(
        `https://localhost:7201/api/Patient/${patient.patientId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      message.success("Profile updated successfully.");
      setPatient(response.data);
      setIsUpdatePatientVisible(false);
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

  const getImageUrl = () => {
    if (patient?.imageId) {
      return `https://localhost:7201/images/${patient.imageId}`;
    }
    return defaultImage;
  };

  const medicalRecordColumns = [
    { title: "Description", dataIndex: "pershkrimi", key: "pershkrimi" },
    { title: "Symptoms", dataIndex: "symptoms", key: "symptoms" },
    { title: "Diagnosis", dataIndex: "diagnosis", key: "diagnosis" },
    { title: "Results", dataIndex: "results", key: "results" },
  ];
  const appointmentColumns = [
    { title: "Date", dataIndex: "data", key: "date" },
    { title: "Reason", dataIndex: "ceshtja", key: "reason" },
    { title: "Time", dataIndex: "ora", key: "time" },
  ];
  const prescriptionColumns = [
    { title: "Diagnosis", dataIndex: "diagnoza", key: "diagnosis" },
    { title: "Medicine", dataIndex: "medicina", key: "medicine" },
  ];

  return (
    <>
      <Navbar />
      <div className="container1">
        <div className="AfterSideBar1">
          <div className="maindoctorProfile">
            <div className="firstBox">
              <img src={getImageUrl()} alt="Patient" />
              <br />
              <br />
              <br />
              <br />
              <hr />
              <div className="singleitemdiv">
                <BsPersonCircle className="singledivicons" />
                <p>{`${patient?.emri} ${patient?.mbiemri}`}</p>
              </div>
              <div className="singleitemdiv">
                <FaBirthdayCake className="singledivicons" />
                <p>{patient?.mosha} years old</p>
              </div>
              <div className="singleitemdiv">
                <BsGenderAmbiguous className="singledivicons" />
                <p>{patient?.nrTelefonit}</p>
              </div>
              <div className="singleitemdiv">
                <MdEmail className="singledivicons" />
                <p>{patient?.email}</p>
              </div>
              <Button onClick={() => setIsUpdatePatientVisible(true)} id="editbtn">
                <AiFillEdit /> Edit Profile
              </Button>
              <Modal
                title="Edit Patient Details"
                open={isUpdatePatientVisible}
                onCancel={() => setIsUpdatePatientVisible(false)}
                footer={[
                  <Button onClick={() => setIsUpdatePatientVisible(false)}>Cancel</Button>,
                  <Button type="primary" onClick={handleFormSubmit}>
                    Save Changes
                  </Button>,
                ]}
              >
                <form className="inputForm">
                  <label htmlFor="emri">First Name</label>
                  <input
                    name="emri"
                    value={formData.emri}
                    onChange={handleFormChange}
                    type="text"
                  />
                  <label htmlFor="mbiemri">Last Name</label>
                  <input
                    name="mbiemri"
                    value={formData.mbiemri}
                    onChange={handleFormChange}
                    type="text"
                  />
                  <label htmlFor="mosha">Age</label>
                  <input
                    name="mosha"
                    value={formData.mosha}
                    onChange={handleFormChange}
                    type="number"
                  />
                  <label htmlFor="nrTelefonit">NrTelefonit</label>
                  <input
                    name="nrTelefonit"
                    value={formData.nrTelefonit}
                    onChange={handleFormChange}
                    type="number"
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    type="email"
                  />
                </form>
              </Modal>
            </div>
            <div className="SecondBox">
              <h2>My Medical Records</h2>
              <Table dataSource={medicalRecords} columns={medicalRecordColumns} rowKey="medicalRecordId" />
              <h2>My Appointments</h2>
              <Table dataSource={appointments} columns={appointmentColumns} rowKey="appointmentId" />
              <h2>My Prescriptions</h2>
              <Table dataSource={prescriptions} columns={prescriptionColumns} rowKey="prescriptionId" />
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default PatientProfile;
