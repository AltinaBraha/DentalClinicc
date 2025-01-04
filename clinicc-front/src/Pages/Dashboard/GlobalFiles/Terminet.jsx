import { Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditFilled, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Terminet = () => {
  const [terminets, setTerminet] = useState([]);
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
  
    const fetchTerminet = async (patientsList, dentistsList) => {
      try {
        const response = await axios.get("https://localhost:7201/api/Appointments", {
          headers: { Authorization: `Bearer ${token1}` },
        });
        const appointmentsData = response.data?.$values || [];
        // Map dentist and patient names to ratings
        const appointmentsWithNames = appointmentsData.map((terminet) => {
          const dentist = dentistsList.find((d) => d.dentistId === terminet.dentistId);
          const patient = patientsList.find((p) => p.patientId === terminet.patientId);
          return {
            ...terminet,
            dentistName: dentist ? dentist.emri : "Unknown Dentist", // Fallback if not found
            patientName: patient ? patient.emri : "Unknown Patient", // Fallback if not found
          };
        });
        setTerminet(appointmentsWithNames);
      } catch (error) {
        console.error("Failed to fetch Appointments:", error);
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
          fetchTerminet(patients, dentists);
        }
      }, [patients,dentists, refresh]); 
  // API call to delete an appointment
  const deleteTerminet = async (appointmentId) => {
    try {
      await axios.delete(`https://localhost:7201/api/Appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${token1}` },
      });
      setRefresh(!refresh); // Trigger re-fetch after deletion
      console.log(`Appointment with ID ${appointmentId} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete appointment with ID ${appointmentId}:`, error);
    }
  };

  const columns = [
    { title: "Date", dataIndex: "data", key: "data" },
    { title: "Reason", dataIndex: "ceshtja", key: "ceshtja" },
    { title: "Time", dataIndex: "ora", key: "ora" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Dentist", dataIndex: "dentistName", key: "dentistName" },
    { title: "Patient", dataIndex: "patientName", key: "patientName" },
    {
      title: "Actions",
      key: "action",
      render: (record) => {
        return (
          <>
            <EditFilled
              className="edit"
              onClick={() => navigate(`/EditAppointment/${record.appointmentId}`)}
            />
            <DeleteOutlined
              className="edit"
              style={{ color: "red", marginLeft: 10 }}
              onClick={() => deleteTerminet(record.appointmentId)}
            />
          </>
        );
      },
    },
  ];


  return (
    <>
      {terminets.length > 0 ? (
        <div className="patientDetails1">
          <h1>Appointments Details</h1>
          <div className="patientBox1">
            <Table columns={columns} dataSource={terminets} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Terminet;
