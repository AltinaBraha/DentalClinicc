import { Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditFilled, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [refresh, setRefresh] = useState(false); 
  const token = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      const response = await axios.get("https://localhost:7201/api/Patient", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(response.data?.$values || []);
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    }
  };

  const fetchDentists = async () => {
    try {
      const response = await axios.get("https://localhost:7201/api/Dentist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDentists(response.data?.$values || []);
    } catch (error) {
      console.error("Failed to fetch dentists:", error);
    }
  };

  const fetchPrescriptions = async () => {
    setLoading(true); 
    try {
      const response = await axios.get("https://localhost:7201/api/Prescription", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const prescriptionData = response.data?.$values || [];
      const prescriptionsWithNames = prescriptionData.map((prescription) => {
        const patient = patients.find((p) => p.patientId === prescription.patientId);
        const dentist = dentists.find((d) => d.dentistId === prescription.dentistId);
        return {
          ...prescription,
          key: prescription.prescriptionId, 
          patientName: patient ? `${patient.emri} ${patient.mbiemri}` : "Unknown Patient",
          dentistName: dentist ? `${dentist.emri} ${dentist.mbiemri}` : "Unknown Dentist",
        };
      });
      setPrescriptions(prescriptionsWithNames);
    } catch (error) {
      console.error("Failed to fetch prescriptions:", error);
    }
    setLoading(false); 
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        await fetchPatients(); 
        await fetchDentists();
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (patients.length > 0 && dentists.length > 0) {
      fetchPrescriptions(patients, dentists);
    }
  }, [patients,dentists, refresh]);

  const deletePrescription = async (prescriptionId) => {
    try {
      await axios.delete(`https://localhost:7201/api/Prescription/${prescriptionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefresh(!refresh); 
    } catch (error) {
      console.error(`Failed to delete prescription with ID ${prescriptionId}:`, error);
    }
  };


  const columns = [
    { title: "Diagnoza", dataIndex: "diagnoza", key: "diagnoza" },
    { title: "Medicina", dataIndex: "medicina", key: "medicina" },
    { title: "Patient", dataIndex: "patientName", key: "patientName" },
    { title: "Dentist", dataIndex: "dentistName", key: "dentistName" },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <>
          <EditFilled
            className="edit"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/EditPrescription/${record.prescriptionId}`)}
          />
          <DeleteOutlined
            className="edit"
            style={{ color: "red", marginLeft: 10, cursor: "pointer" }}
            onClick={() => deletePrescription(record.prescriptionId)}
          />
        </>
      ),
    },
  ];

  return (
    <div className="patientDetails1">
      <h1>Prescription Details</h1>
      {loading ? (
        <p>Loading prescriptions...</p>
      ) : prescriptions.length > 0 ? (
        <Table columns={columns} dataSource={prescriptions} />
      ) : (
        <p>No prescriptions available</p>
      )}
    </div>
  );
};

export default Prescription;

