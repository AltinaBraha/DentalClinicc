import { Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [patients, setPatients] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const token1 = localStorage.getItem("accessToken");

  const navigate = useNavigate();


   // Funksioni për formatimin e datës
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
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


  const fetchContacts = async (patientsList) => {
    try {
      const response = await axios.get("https://localhost:7201/api/Contact", {
        headers: { Authorization: `Bearer ${token1}` },
      });
      const contactsData = response.data?.$values || [];
      // Map department names to admins
      const contactsWithPatients = contactsData.map((contact) => {
        const patient = patientsList.find((d) => d.patientId === contact.patientId);
        return {
          ...contact,
          patientName: patient ? patient.emri : "Unknown", // Fallback if department not found
          messageDate: formatDate(contact.messageDate),
        };
      });
      setContacts(contactsWithPatients);
    } catch (error) {
      console.error("Failed to fetch Contacts:", error);
    }
  };

  // Combined Fetch to Ensure Sequential Execution
      useEffect(() => {
        const fetchData = async () => {
          if (token1) {
            await fetchPatients(); // Fetch departments first
          }
        };
        fetchData();
      }, [token1]); // Fetch departments when token changes
  
      useEffect(() => {
          if (patients.length > 0) {
            // Fetch dentists only after departments are fetched and updated
            fetchContacts(patients);
          }
        }, [patients, refresh]); // Re-fetch dentists when departments or refresh changes

  // API call to delete an appointment
  const deleteContact = async (contactId) => {
    try {
      await axios.delete(`https://localhost:7201/api/Contact/${contactId}`, {
        headers: { Authorization: `Bearer ${token1}` },
      });
      setRefresh(!refresh); // Trigger re-fetch after deletion
      console.log(`Contact with ID ${contactId} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete Contact with ID ${contactId}:`, error);
    }
  };

  const columns = [
    { title: "Mesazhi", dataIndex: "mesazhi", key: "mesazhi" },
    { title: "MessageDate", dataIndex: "messageDate", key: "messageDate" },
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
              onClick={() => deleteContact(record.contactId)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      {contacts.length > 0 ? (
        <div className="patientDetails1">
          <h1>Contact Details</h1>
          <div className="patientBox1">
            <Table columns={columns} dataSource={contacts} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Contact;
