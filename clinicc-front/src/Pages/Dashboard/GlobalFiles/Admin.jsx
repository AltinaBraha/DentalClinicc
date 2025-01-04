import { Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditFilled, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const token1 = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  // Fetch Departments
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

  // Fetch Admins
  const fetchAdmins = async (departmentList) => {
    try {
      const response = await axios.get("https://localhost:7201/api/Admin", {
        headers: { Authorization: `Bearer ${token1}` },
      });
      const adminsData = response.data?.$values || [];

      // Map department names to admins
      const adminsWithDepartments = adminsData.map((admin) => {
        const department = departmentList.find((d) => d.departmentId === admin.departmentId);
        return {
          ...admin,
          departmentName: department ? department.emri : "Unknown", // Fallback if department not found
        };
      });
      setAdmins(adminsWithDepartments);
    } catch (error) {
      console.error("Failed to fetch Admins:", error);
    }
  };

  // Combined Fetch to Ensure Sequential Execution
    useEffect(() => {
      const fetchData = async () => {
        if (token1) {
          await fetchDepartments(); // Fetch departments first
        }
      };
      fetchData();
    }, [token1]); // Fetch departments when token changes

    useEffect(() => {
        if (departments.length > 0) {
          // Fetch dentists only after departments are fetched and updated
          fetchAdmins(departments);
        }
      }, [departments, refresh]); // Re-fetch dentists when departments or refresh changes

  // API call to delete an appointment
  const deleteAdmin = async (adminId) => {
    try {
      await axios.delete(`https://localhost:7201/api/Admin/${adminId}`, {
        headers: { Authorization: `Bearer ${token1}` },
      });
      setRefresh(!refresh); // Trigger re-fetch after deletion
      console.log(`Admin with ID ${adminId} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete admin with ID ${adminId}:`, error);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "emri", key: "emri" },
    { title: "Reason", dataIndex: "mbiemri", key: "mbiemri" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Department", dataIndex: "departmentName", key: "departmentName" },
    {
      title: "Actions",
      key: "action",
      render: (record) => {
        return (
          <>
            <EditFilled
              className="edit"
              onClick={() => navigate(`/EditAdmin/${record.adminId}`)}
            />
            <DeleteOutlined
              className="edit"
              style={{ color: "red", marginLeft: 10 }}
              onClick={() => deleteAdmin(record.adminId)}
            />
          </>
        );
      },
    },
  ];


  return (
    <>
      {admins.length > 0 ? (
        <div className="patientDetails1">
          <h1>Admins Details</h1>
          <div className="patientBox1">
            <Table columns={columns} dataSource={admins} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Admin;
