import { Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditFilled, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const MedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
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

  
    const fetchMedicalRecords = async () => {
        try {
          const response = await axios.get("https://localhost:7201/api/MedicalRecord", {
            headers: { Authorization: `Bearer ${token1}` },
          });
          const medicalRecordsData = response.data?.$values || [];
          // Map dentist and patient names to ratings
          const medicalRecordsWithNames = medicalRecordsData.map((medicalRecord) => {
            const dentist = dentists.find((d) => d.dentistId === medicalRecord.dentistId);
            const patient = patients.find((p) => p.patientId === medicalRecord.patientId);
            return {
              ...medicalRecord,
              dentistName: dentist ? dentist.emri : "Unknown Dentist", // Fallback if not found
              patientName: patient ? patient.emri : "Unknown Patient", // Fallback if not found
            };
          });
          setMedicalRecords(medicalRecordsWithNames);
        } catch (error) {
          console.error("Failed to fetch medicalRecords:", error);
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
            fetchMedicalRecords(patients, dentists);
          }
        }, [patients,dentists, refresh]); 
  
  const deleteMedicalRecords = async (medicalRecordId) => {
    try {
      await axios.delete(`https://localhost:7201/api/MedicalRecord/${medicalRecordId}`, {
        headers: { Authorization: `Bearer ${token1}` },
      });
      setRefresh(!refresh); // Trigger re-fetch after deletion
      console.log(`MedicalRecords with ID ${medicalRecordId} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete medicalRecords with ID ${medicalRecordId}:`, error);
    }
  };

  const columns = [
    { title: "Pershkrimi", dataIndex: "pershkrimi", key: "pershkrimi" },
    { title: "Symptoms", dataIndex: "symptoms", key: "symptoms" },
    { title: "Diagnosis", dataIndex: "diagnosis", key: "diagnosis" },
    { title: "Results", dataIndex: "results", key: "results" },
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
              onClick={() => navigate(`/EditMedicalRecords/${record.medicalRecordId}`)}
            />
            <DeleteOutlined
              className="edit"
              style={{ color: "red", marginLeft: 10 }}
              onClick={() => deleteMedicalRecords(record.medicalRecordId)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    fetchMedicalRecords();
  }, [refresh]);

  return (
    <>
      {medicalRecords.length > 0 ? (
        <div className="patientDetails1">
          <h1>MedicalRecords Details</h1>
          <div className="patientBox1">
            <Table columns={columns} dataSource={medicalRecords} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MedicalRecords;
