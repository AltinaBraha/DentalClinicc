import { Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [dentists, setDentists] = useState([]);
  const [patients, setPatients] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const token1 = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  const fetchDentists = async () => {
    try {
      const response = await axios.get("https://localhost:7201/api/Dentist", {
        headers: { Authorization: `Bearer ${token1}` },
      });
      setDentists(response.data?.$values || []);
    } catch (error) {
      console.error("Failed to fetch Dentist:", error);
    }
  };

    const fetchPatients = async () => {
      try {
        const response = await axios.get("https://localhost:7201/api/Patient", {
          headers: { Authorization: `Bearer ${token1}` },
        });
        setPatients(response.data?.$values || []);
      } catch (error) {
        console.error("Failed to fetch Patient:", error);
      }
    };
  
  const fetchComplaints = async (patientsList, dentistsList) => {
    try {
      const response = await axios.get("https://localhost:7201/api/Complaints", {
        headers: { Authorization: `Bearer ${token1}` },
      });
      const complaintsData = response.data?.$values || [];
      // Map dentist and patient names to ratings
      const complaintsWithNames = complaintsData.map((complaint) => {
        const dentist = dentistsList.find((d) => d.dentistId === complaint.dentistId);
        const patient = patientsList.find((p) => p.patientId === complaint.patientId);
        return {
          ...complaint,
          dentistName: dentist ? dentist.emri : "Unknown Dentist", // Fallback if not found
          patientName: patient ? patient.emri : "Unknown Patient", // Fallback if not found
        };
      });
      setComplaints(complaintsWithNames);
    } catch (error) {
      console.error("Failed to fetch Complaints:", error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      if (token1) {
        await fetchPatients(); // Fetch departments first
        await fetchDentists();
      }
    };
    fetchData();
  }, [token1]);

  useEffect(() => {
    if (patients.length > 0 && dentists.length > 0) {// Fetch dentists only after departments are fetched and updated
      fetchComplaints(patients, dentists);
    }
  }, [patients,dentists, refresh]); 
  // API call to delete an appointment
  const deleteComplaint = async (complaintsId) => {
    try {
      await axios.delete(`https://localhost:7201/api/Complaints/${complaintsId}`, {
        headers: { Authorization: `Bearer ${token1}` },
      });
      setRefresh(!refresh); // Trigger re-fetch after deletion
      console.log(`Complaint with ID ${complaintsId} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete Complaint with ID ${complaintsId}:`, error);
    }
  };

  const columns = [
    { title: "Ankesa", dataIndex: "ankesa", key: "ankesa" },
    { title: "Dentist", dataIndex: "dentistName", key: "dentistName" },
    { title: "Patient", dataIndex: "patientName", key: "patientName" },
    {
      title: "Actions",
      key: "action",
      render: (record) => {
        return (
          <>
            <DeleteOutlined
              className="edit"
              style={{ color: "red", marginLeft: 10 }}
              onClick={() => deleteComplaint(record.complaintsId)}
            />
          </>
        );
      },
    },
  ];


  return (
    <>
      {complaints.length > 0 ? (
        <div className="patientDetails1">
          <h1>Complaints Details</h1>
          <div className="patientBox1">
            <Table columns={columns} dataSource={complaints} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Complaint;
