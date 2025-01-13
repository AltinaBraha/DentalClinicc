import { Table } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditFilled, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Terminet from "./Terminet";
import Admins from "./Admin";
import Dentists from "./Dentist";
import Ratings from "./Rating";
import Complaint from "./Complaint";
import Contact from "./Contact";
import MedicalRecords from "./MedicalRecords";
import Prescription from "./Prescription";
import "../CSS/CommonCSS.css";
const FrontPage = () => {
    const [patients, setPatients] = useState([]);
    const token1 = localStorage.getItem("accessToken");
    const dentist1 = (() => {
      try {
        return JSON.parse(localStorage.getItem("dentist")) || {};
      } catch {
        console.error("Invalid patient data in localStorage");
        return {};
      }
    })();
    const admin1 = (() => {
      try {
        return JSON.parse(localStorage.getItem("admin")) || {};
      } catch {
        console.error("Invalid patient data in localStorage");
        return {};
      }
    })();

  console.log('dentist: ',dentist1);
  console.log('admin', admin1);
  const dentistsId = dentist1?.dentistId;
  const adminsId = admin1?.adminId;
  console.log('dentistID: ',dentistsId);
  console.log('adminID', adminsId);

  const deletePatient = async (patientId) => {
    try {
      await axios.delete(`https://localhost:7201/api/Patient/${patientId}`, {
        headers: { Authorization: `Bearer ${token1}` },
      });
      setRefresh(!refresh); 
      console.log(`Patient with ID ${patientId} deleted successfully`);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error('Patient not found');
        } else {
            console.error('An error occurred:', error.message);
        }
    }
  };

    const columns = [
      { title: "Name", dataIndex: "emri", key: "emri" },
      { title: "Surname", dataIndex: "mbiemri", key: "mbiemri" },
      { title: "Age", dataIndex: "mosha", key: "mosha" },
      { title: "PhoneNumber", dataIndex: "nrTelefonit", key: "nrTelefonit" },
      { title: "Email", dataIndex: "email", key: "email" },
      {title:"Actions", key:"action", render:(record) => {
        return (
          <>
          <EditFilled className="edit" onClick={()=>{
            ;
            return navigate(`/EditPatient/${record.patientId}`);
          }}/>
          <DeleteOutlined className="edit" style={{ color: "red", marginLeft: 10 }}
              onClick={() => deletePatient(record.patientId)}
            />
          </>
        )
      } }
    ];

    const navigate = useNavigate();
    console.log('Patients: ',patients);


 

    const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`https://localhost:7201/api/Patient`, {
          headers: { Authorization: `Bearer ${token1}` },
        });
        setPatients(response.data?.$values || []);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };

    if (token1) fetchPatients();
  }, [token1], [refresh]);

    return (
        <div className="container1">
          <Sidebar />
          <div className="AfterSideBar1">
        {patients  && patients.length > 0 ? (<div className="patientDetails1">
            <h1>Patient Details</h1>
            <div className="patientBox1">
              <Table columns={columns} dataSource={patients} />
            </div>
          </div>): ("")}
           
        <Admins/>
        <Dentists/>
        <Terminet/>
        <MedicalRecords/>
        <Prescription/>
        <Ratings/>
        <Complaint/>
        <Contact/>
        </div>
    </div>
    )
}    

export default FrontPage;