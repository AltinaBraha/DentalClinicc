import { Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditFilled, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Dentist = () => {
  const [dentists, setDentists] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const token1 = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("https://localhost:7201/api/Department", {
        headers: { Authorization: `Bearer ${token1}` },
      });
      setDepartments(response.data?.$values || []);
    } catch (error) {
      console.error("Failed to fetch Departments:", error);
    }
  };

  const fetchDentists = async (departmentList) => {
    try {
      const response = await axios.get("https://localhost:7201/api/Dentist", {
        headers: { Authorization: `Bearer ${token1}` },
      });
      const dentistsData = response.data?.$values || [];

      const dentistsWithDepartments = dentistsData.map((dentist) => {
        const department = departmentList.find((d) => d.departmentId === dentist.departmentId);
        return {
          ...dentist,
          departmentName: department ? department.emri : "Unknown", 
        };
      });
      setDentists(dentistsWithDepartments);
    } catch (error) {
      console.error("Failed to fetch Dentists:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token1) {
        await fetchDepartments(); 
      }
    };
    fetchData();
  }, [token1]); 

  useEffect(() => {
    if (departments.length > 0) {
      fetchDentists(departments);
    }
  }, [departments, refresh]); 

  const deleteDentist = async (dentistId) => {
    try {
      await axios.delete(`https://localhost:7201/api/Dentist/${dentistId}`, {
        headers: { Authorization: `Bearer ${token1}` },
      });
      setRefresh(!refresh); 
      console.log(`Dentist with ID ${dentistId} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete Dentist with ID ${dentistId}:`, error);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "emri", key: "emri" },
    { title: "Surname", dataIndex: "mbiemri", key: "mbiemri" },
    { title: "Age", dataIndex: "mosha", key: "mosha" },
    { title: "Phone Number", dataIndex: "nrTelefonit", key: "nrTelefonit" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Specialization", dataIndex: "specializimi", key: "specializimi" },
    { title: "Starting Time", dataIndex: "oraFillimit", key: "oraFillimit" },
    { title: "Finishing Time", dataIndex: "oraMbarimit", key: "oraMbarimit" },
    { title: "Department", dataIndex: "departmentName", key: "departmentName" },
    {
      title: "Actions",
      key: "action",
      render: (record) => {
        return (
          <>
            <EditFilled
              className="edit"
              onClick={() => navigate(`/EditDentist/${record.dentistId}`)}
            />
            <DeleteOutlined
              className="edit"
              style={{ color: "red", marginLeft: 10 }}
              onClick={() => deleteDentist(record.dentistId)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      {dentists.length > 0 ? (
        <div className="patientDetails1">
          <h1>Dentist Details</h1>
          <div className="patientBox1">
            <Table columns={columns} dataSource={dentists} rowKey="dentistId" />
          </div>
        </div>
      ) : (
        <p>No dentist data available.</p>
      )}
    </>
  );
};

export default Dentist;
