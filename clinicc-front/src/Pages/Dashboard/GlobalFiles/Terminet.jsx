import { Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditFilled, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Terminet = () => {
  const [terminets, setTerminet] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const token1 = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  
  const fetchTerminet = async () => {
    try {
      const response = await axios.get("https://localhost:7201/api/Appointments", {
        headers: { Authorization: `Bearer ${token1}` },
      });
      setTerminet(response.data?.$values || []);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

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
    { title: "Dentist-ID", dataIndex: "dentistId", key: "dentistId" },
    { title: "Patient-ID", dataIndex: "patientId", key: "patientId" },
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

  useEffect(() => {
    fetchTerminet();
  }, [refresh]);

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
