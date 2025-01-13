import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/DentistProfile.css";
import { BiTime } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { BsPersonCircle, BsGenderAmbiguous } from "react-icons/bs";
import { FaMoneyBillWave, FaMapMarkedAlt, FaBirthdayCake, FaClock, FaUserMd, FaPhoneAlt } from "react-icons/fa";
import { Button, message, Modal, Table } from "antd";
import Navbar from "../Components/Navbar/Navbar";
import Footer from '../Components/Footer/Footer';
import defaultImage from "../Assets/person.png";

const BASE_URL = "https://localhost:7201";

const DentistProfile = () => {
  const dentist1 = (() => {
    try {
      return JSON.parse(localStorage.getItem("dentist")) || {};
    } catch {
      console.error("Invalid dentist data in localStorage");
      return {};
    }
  })();

  const [dentist, setDentist] = useState(null);
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [ratings, setRatings] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [isUpdateDentistVisible, setIsUpdateDentistVisible] = useState(false);
  const [formData, setFormData] = useState({
    dentistId: dentist1.dentistId,
    emri: "",
    mbiemri: "",
    mosha: "",
    nrTelefonit: "",
    email: "",
    specializimi: "",
    oraFillimit:"",
    oraMbarimit:"",
    imageId: "",
  });

  useEffect(() => {
    const fetchDentistData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`https://localhost:7201/api/Dentist/${dentist1.dentistId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dentistData = response.data;
        setDentist(dentistData);
        setFormData({
          dentistId: dentistData.dentistId,
          emri: dentistData.emri,
          mbiemri: dentistData.mbiemri,
          mosha: dentistData.mosha,
          nrTelefonit: dentistData.nrTelefonit,
          email: dentistData.email,
          specializimi: dentistData.specializimi,
          oraFillimit: dentistData.oraFillimit,
          oraMbarimit: dentistData.oraMbarimit,
          imageId: dentistData.imageId,
        });

        if (dentistData.imageId) {
          fetchImageUrl(dentistData.imageId);
        }
      } catch (error) {
        console.error("Failed to fetch dentist data:", error);
      }
    };

    const fetchImageUrl = async (imageId) => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`https://localhost:7201/api/images/${imageId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data?.filePath) {
          const fullUrl = `${BASE_URL}${response.data.filePath}`;
          console.log(fullUrl);
          setImageUrl(fullUrl);
        }
      } catch (error) {
        console.error("Failed to fetch image URL:", error);
        setImageUrl(defaultImage);
      }
    };

    fetchDentistData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const dentistId = dentist?.dentistId;

        if (!dentistId) return;

        const [ratingsRes, complaintsRes, appointmentsRes] = await Promise.all([
          axios.get(`https://localhost:7201/api/Rating/dentist/${dentistId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`https://localhost:7201/api/Complaints/dentist/${dentistId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`https://localhost:7201/api/Appointments/dentist/${dentistId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setRatings(ratingsRes.data["$values"]);
        setComplaints(complaintsRes.data["$values"]);
        setAppointments(appointmentsRes.data["$values"]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (dentist) fetchData();
  }, [dentist]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const refetchDentistData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`https://localhost:7201/api/Dentist/${dentist1.dentistId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDentist(response.data);
    } catch (error) {
      console.error("Failed to refetch dentist data:", error);
    }
  };
  

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      const uniqueFileName = `${Date.now()}_${file.name}`;
      formData.append("File", file);
      formData.append("FileName", uniqueFileName);
      formData.append("FileDescription", "Profile picture upload");
  
      const token = localStorage.getItem("accessToken");
      const response = await axios.post("https://localhost:7201/api/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Image uploaded successfully:", response.data);
  
      const newImageId = response.data.imageId;
      setFormData((prev) => ({ ...prev, imageId: newImageId }));
      setDentist((prev) => {
        if (!prev) return null;
        return { ...prev, imageId: newImageId };
      });
  
      console.log("Updated dentist after image upload:", dentist);
  
      await refetchDentistData();
      message.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error.response?.data || error.message);
      message.error("Failed to upload image. Please try again.");
    }
  };
  
  

  const handleRemovePhoto = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `https://localhost:7201/api/images/${dentist?.imageId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageId: "", 
      }));
      setDentist((prev) => ({
        ...prev,
        imageId: "", 
      }));
      message.success("Photo removed successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error removing photo:", error);
      message.error("Failed to remove photo. Please try again.");
    }
  };

  const handleFormSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `https://localhost:7201/api/Dentist/${dentist.dentistId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success("Profile updated successfully.");
      setDentist(response.data);
      setIsUpdateDentistVisible(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile.");
    }
  };

  const ratingsColumns = [
    { title: "Sherbimi", dataIndex: "sherbimi", key: "sherbimi" },
    { title: "Sjellja", dataIndex: "sjellja", key: "sjellja" },
  ];
  const complaintsColumns = [
    { title: "Ankesa", dataIndex: "ankesa", key: "ankesa" },
  ];
  const appointmentColumns = [
    { title: "Date", dataIndex: "data", key: "date" },
    { title: "Reason", dataIndex: "ceshtja", key: "reason" },
    { title: "Time", dataIndex: "ora", key: "time" },
    { title: "Patient", dataIndex: "patientName", key: "patientName" }, 
  ];
  return (
    <>
      <Navbar />
      <div className="container1">
        <div className="AfterSideBar1">
          <div className="maindoctorProfile">
            <div className="firstBox">
              <div className="mb-3">
              <img
                  src={imageUrl}
                  alt="Profile"
                  className="img-thumbnail"
                  style={{ width: "200px", height: "200px" }}
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                />
              </div>
              <hr />
              <div className="singleitemdiv">
                <BsPersonCircle className="singledivicons" />
                <p>{`${dentist?.emri} ${dentist?.mbiemri}`}</p>
              </div>
              <div className="singleitemdiv">
                <FaBirthdayCake className="singledivicons" />
                <p>{dentist?.mosha} years old</p>
              </div>
              <div className="singleitemdiv">
                <FaPhoneAlt className="singledivicons" />
                <p>{dentist?.nrTelefonit}</p>
              </div>
              <div className="singleitemdiv">
                <MdEmail className="singledivicons" />
                <p>{dentist?.email}</p>
              </div>
              <div className="singleitemdiv">
                <FaUserMd className="singledivicons" />
                <p>{dentist?.specializimi}</p>
              </div>
              <div className="singleitemdiv">
                <FaClock className="singledivicons" />
                <p>{dentist?.oraFillimit} - {dentist?.oraMbarimit}</p>
              </div>
              <Button onClick={() => setIsUpdateDentistVisible(true)} id="editbtn">
                <AiFillEdit /> Edit Profile
              </Button>
              <button
                type="button"
                id="btnremove"
                className="btn btn-danger mb-3"
                onClick={handleRemovePhoto}
              >
                Remove 
              </button>
              <Modal
                title="Edit Dentist Details"
                open={isUpdateDentistVisible}
                onCancel={() => setIsUpdateDentistVisible(false)}
                footer={[
                  <Button onClick={() => setIsUpdateDentistVisible(false)}>Cancel</Button>,
                  <Button type="primary" onClick={handleFormSubmit}>
                    Save Changes
                  </Button>,
                ]}
              >
                <form className="inputForm">
                  <label htmlFor="emri">First Name</label>
                  <input
                    name="emri"
                    value={formData.emri}
                    onChange={handleFormChange}
                    type="text"
                  />
                  <label htmlFor="mbiemri">Last Name</label>
                  <input
                    name="mbiemri"
                    value={formData.mbiemri}
                    onChange={handleFormChange}
                    type="text"
                  />
                  <label htmlFor="mosha">Age</label>
                  <input
                    name="mosha"
                    value={formData.mosha}
                    onChange={handleFormChange}
                    type="number"
                  />
                  <label htmlFor="nrTelefonit">Phone Number</label>
                  <input
                    name="nrTelefonit"
                    value={formData.nrTelefonit}
                    onChange={handleFormChange}
                    type="number"
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    type="email"
                  />
                   <label htmlFor="specializimi">Specializimi</label>
                  <input
                    name="specializimi"
                    value={formData.specializimi}
                    onChange={handleFormChange}
                    type="specializimi"
                  />
                  <label htmlFor="oraFillimit">OraFillimit</label>
                  <input
                    name="oraFillimit"
                    value={formData.oraFillimit}
                    onChange={handleFormChange}
                    type="oraFillimit"
                  />
                  <label htmlFor="oraMbarimit">OraMbarimit</label>
                  <input
                    name="oraMbarimit"
                    value={formData.oraMbarimit}
                    onChange={handleFormChange}
                    type="oraMbarimit"
                  />
                  <label htmlFor="oraMbarimit">Profile Photo</label>
                  <input
                    type="file"
                    className="form-control mb-3"
                    id="foto"
                    name="foto"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                  />
                </form>
              </Modal>
            </div>
            <div className="SecondBox">
                    <h2>Patient Ratings</h2>
                    <Table dataSource={ratings} columns={ratingsColumns} rowKey="ratingId" />
                    <h2>Patient Complaints</h2>
                    <Table dataSource={complaints} columns={complaintsColumns} rowKey="complaintId" />
                    <h2>Patient Appointment</h2>
                    <Table dataSource={appointments} columns={appointmentColumns} rowKey="appointmentId" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DentistProfile;
