import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { MdDepartureBoard, MdEmail, MdPerson } from "react-icons/md";
import { BsTelephone, BsPersonCircle, BsClock, BsHourglass, BsFileText } from "react-icons/bs";
import { Button, message, Modal, Select } from "antd";
import { useParams } from "react-router-dom";
import Sidebar from "../GlobalFiles/Sidebar";
import "../CSS/Edit.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSolidTime } from "react-icons/bi";

const notify = (text) => toast(text);

const EditDentist = () => {
  const { id } = useParams(); // Get the patient ID from the URL
  const token = localStorage.getItem("accessToken"); // Retrieve the token from localStorage
console.log(token);

  const [formData, setFormData] = useState({
    dentistId: id,
    emri: "",
    mbiemri: "",
    mosha: "",
    nrTelefonit: "",
    specializimi: "",
    oraFillimit: "",
    oraMbarimit: "",
    email: "",
    imageId: "",
    departmentId: "",
  });

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`https://localhost:7201/api/Department`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDepartments(response.data?.$values || []);
      } catch (error) {
        console.error("Failed to fetch Departments:", error);
        notify("Failed to fetch Departments");
      }
    };

    if (token) fetchDepartments();
  }, [token]);

  // Fetch patient data when the component mounts
  useEffect(() => {
    const fetchDentist = async () => {
      try {
        const response = await axios.get(`https://localhost:7201/api/Dentist/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setFormData({
          dentistId: data.dentistId,
          emri: data.emri || "",
          mbiemri: data.mbiemri || "",
          mosha: data.mosha || "",
          nrTelefonit: data.nrTelefonit || "",
          specializimi: data.specializimi || "",
          oraFillimit: data.oraFillimit || "",
          oraMbarimit: data.oraMbarimit || "",
          email: data.email || "",
          imageId: data.imageId,
          departmentId: data.departmentId,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Dentist data:", error.response?.data || error.message)
        message.error("Failed to load Dentist data.");
        setLoading(false);
      }
    };

    fetchDentist();
  }, [id, token]);

  const success = (text) => {
    messageApi.success(text);
  };

  const error = (text) => {
    messageApi.error(text);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDropdownChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.put(
        `https://localhost:7201/api/Dentist/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
            message.success("Profile updated successfully.");
            setOpen(false);
          } catch (error) {
              if (error.response) {
                  console.error("Response data:", error.response.data);
                  console.error("Response status:", error.response.status);
                  console.error("Response headers:", error.response.headers);
              } else if (error.request) {
                  console.error("Request made but no response received:", error.request);
              } else {
                  console.error("Error setting up the request:", error.message);
              }
              message.error("Failed to update profile.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {contextHolder}
      <div className="container1">
        <Sidebar />
        <div className="AfterSideBar1" style={{ marginLeft: "26%", marginTop: "5%" }}>
          <div className="maindoctorProfile">
            <div className="firstBox" style={{ marginLeft: "-15%" }}>
              <br />
              <div className="singleitemdiv">
                <BsPersonCircle className="singledivicons" />
                <p>Name: {formData.emri}</p>
              </div>
              <div className="singleitemdiv">
                <BsPersonCircle className="singledivicons" />
                <p>Surname: {formData.mbiemri}</p>
              </div>
              <div className="singleitemdiv">
                <BsHourglass className="singledivicons" />
                <p>Age: {formData.mosha}</p>
              </div>
              <div className="singleitemdiv">
                <BsTelephone className="singledivicons" />
                <p>Phone Number: {formData.nrTelefonit}</p>
              </div>
              <div className="singleitemdiv">
                <BsFileText className="singledivicons" />
                <p>Specializimi: {formData.specializimi}</p>
              </div>
              <div className="singleitemdiv">
                <BiSolidTime className="singledivicons" />
                <p>Ora Fillimit: {formData.oraFillimit}</p>
              </div>
              <div className="singleitemdiv">
                <BiSolidTime className="singledivicons" />
                <p>Ora Mbarimit: {formData.oraMbarimit}</p>
              </div>
              <div className="singleitemdiv">
                <MdEmail className="singledivicons" />
                <p>Email: {formData.email}</p>
              </div>
              <div className="singleitemdiv">
                <MdDepartureBoard className="singledivicons" />
                <p>Department: {formData.departmentId}</p>
              </div>
              <div className="singleitemdiv">
                <button onClick={showModal}>
                  <AiFillEdit />
                  Edit
                </button>
              </div>

              <Modal
                title="Edit details"
                open={open}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" type="primary" onClick={handleFormSubmit}>
                    Edit
                  </Button>,
                ]}
              >
                <form className="inputForm">
                  <label htmlFor="emri">Name</label>
                  <input
                    name="emri"
                    value={formData.emri}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Name"
                  />
                  <label htmlFor="mbiemri">Surname</label>
                  <input
                    name="mbiemri"
                    value={formData.mbiemri}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Surname"
                  />
                  <label htmlFor="mosha">Age</label>
                  <input
                    name="mosha"
                    value={formData.mosha}
                    onChange={handleFormChange}
                    type="number"
                    placeholder="Age"
                  />
                  <label htmlFor="nrTelefonit">Phone Number</label>
                  <input
                    name="nrTelefonit"
                    value={formData.nrTelefonit}
                    onChange={handleFormChange}
                    type="number"
                    placeholder="Phone Number"
                  />
                  <label htmlFor="specializimi">Specializimi</label>
                  <input
                    name="specializimi"
                    value={formData.specializimi}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Specializimi"
                  />
                  <label htmlFor="oraFillimit">Ora Fillimit</label>
                  <input
                    name="oraFillimit"
                    value={formData.oraFillimit}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="hh:mm:ss"
                  />
                  <label htmlFor="oraMbarimit">Ora Mbarimit</label>
                  <input
                    name="oraMbarimit"
                    value={formData.oraMbarimit}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="hh:mm:ss"
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    type="email"
                    placeholder="Email"
                  />
                  <label htmlFor="departmentId">Select Department</label>
                  <Select
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={(value) => handleDropdownChange('departmentId', value)}
                  placeholder="Select Department"
                  style={{ width: '100%' }}
                  >
                  {departments.map((department) => (
                    <Select.Option key={department.departmentId} value={department.departmentId}>
                      {department.emri}{/* Adjust based on your patient object */}
                    </Select.Option>
                  ))}
                  </Select>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDentist;
