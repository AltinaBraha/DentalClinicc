import { Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Ratings = () => {
  const [ratings, setRatings] = useState([]);
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
  
  const fetchRatings = async () => {
    try {
      const response = await axios.get("https://localhost:7201/api/Rating", {
        headers: { Authorization: `Bearer ${token1}` },
      });
      const ratingsData = response.data?.$values || [];
      const ratingsWithNames = ratingsData.map((rating) => {
        const dentist = dentists.find((d) => d.dentistId === rating.dentistId);
        const patient = patients.find((p) => p.patientId === rating.patientId);
        return {
          ...rating,
          dentistName: dentist ? dentist.emri : "Unknown Dentist", 
          patientName: patient ? patient.emri : "Unknown Patient", 
        };
      });
      setRatings(ratingsWithNames);
    } catch (error) {
      console.error("Failed to fetch Ratings:", error);
    }
  };

  

  useEffect(() => {
    const fetchData = async () => {
      if (token1) {
        await fetchPatients(); 
        await fetchDentists();
        }
    };
    fetchData();
  }, [token1]);
    
  useEffect(() => {
    if (patients.length > 0 && dentists.length > 0) {
      fetchRatings(patients, dentists);
    }
  }, [patients,dentists, refresh]); 

  const deleteRating = async (ratingId) => {
    try {
      await axios.delete(`https://localhost:7201/api/Rating/${ratingId}`, {
        headers: { Authorization: `Bearer ${token1}` },
      });
      setRefresh(!refresh); 
      console.log(`Rating with ID ${ratingId} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete Rating with ID ${ratingId}:`, error);
    }
  };

  const columns = [
    { title: "Service", dataIndex: "sherbimi", key: "emri" },
    { title: "Behaviour", dataIndex: "sjellja", key: "mbiemri" },
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
              onClick={() => deleteRating(record.ratingId)}
            />
          </>
        );
      },
    },
  ];


  return (
    <>
      {ratings.length > 0 ? (
        <div className="patientDetails1">
          <h1>Ratings Details</h1>
          <div className="patientBox1">
            <Table columns={columns} dataSource={ratings} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Ratings;
