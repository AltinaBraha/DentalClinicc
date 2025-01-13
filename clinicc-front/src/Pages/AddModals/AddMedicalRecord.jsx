import React, { useState } from "react";
import { Modal, Button, Input, notification } from "antd";
import axios from "axios";
import { jsPDF } from "jspdf";
import moment from "moment";

const MedicalRecordModal = ({ patient, visible, onClose, onAdded }) => {
  const token1 = localStorage.getItem("accessToken");
  const dentist1 = (() => {
    try {
      return JSON.parse(localStorage.getItem("dentist")) || {};
    } catch {
      console.error("Invalid dentist data in localStorage");
      return {};
    }
  })();

  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    const medicalRecordData = {
      pershkrimi: description,
      symptoms: symptoms,
      diagnosis: diagnosis,
      results: result,
      patientId: patient.patientId,
      dentistId: dentist1.dentistId,
    };

    try {
      await axios.post(
        `https://localhost:7201/api/MedicalRecord`,
        medicalRecordData,
        {
          headers: { Authorization: `Bearer ${token1}` },
        }
      );
      onAdded();
      onClose();
    } catch (error) {
      console.error("Error adding medical record:", error);
      notification.error({
        message: "Error",
        description: "There was an error adding the medical record.",
      });
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const currentDate = moment().format("MMMM Do YYYY");

    doc.setFontSize(18);
    doc.setTextColor(34, 139, 34);
    doc.text("Patient Medical Record", 14, 20);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${currentDate}`, 150, 20);

    doc.setTextColor(34, 139, 34);
    doc.text("Patient Information", 14, 30);
    doc.setDrawColor(34, 139, 34);
    doc.line(14, 32, 200, 32);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Name:", 14, 40);
    doc.setFont("helvetica", "normal");
    doc.text(`${patient.emri} ${patient.mbiemri}`, 40, 40);

    doc.setFont("helvetica", "bold");
    doc.text("Age:", 14, 50);
    doc.setFont("helvetica", "normal");
    doc.text(`${patient.mosha}`, 40, 50);

    doc.setFont("helvetica", "bold");
    doc.text("Phone:", 14, 60);
    doc.setFont("helvetica", "normal");
    doc.text(`${patient.nrTelefonit}`, 40, 60);

    doc.setFont("helvetica", "bold");
    doc.text("Email:", 14, 70);
    doc.setFont("helvetica", "normal");
    doc.text(`${patient.email}`, 40, 70);

    doc.setFontSize(14);
    doc.setTextColor(255, 0, 0);
    doc.text("Medical Records", 14, 90);
    doc.setDrawColor(255, 0, 0);
    doc.line(14, 92, 200, 92);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Description:", 14, 100);
    doc.setFont("helvetica", "normal");
    doc.text(`${description}`, 50, 100);

    doc.setFont("helvetica", "bold");
    doc.text("Symptoms:", 14, 110);
    doc.setFont("helvetica", "normal");
    doc.text(`${symptoms}`, 50, 110);

    doc.setFont("helvetica", "bold");
    doc.text("Diagnosis:", 14, 120);
    doc.setFont("helvetica", "normal");
    doc.text(`${diagnosis}`, 50, 120);

    doc.setFont("helvetica", "bold");
    doc.text("Results:", 14, 130);
    doc.setFont("helvetica", "normal");
    doc.text(`${result}`, 50, 130);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Dentist Name:", 150, 100);
    doc.setFont("helvetica", "normal");
    doc.text(`${dentist1.emri} ${dentist1.mbiemri}`, 150, 110);

    doc.setFont("helvetica", "bold");
    doc.text("Signature:", 150, 120);
    doc.line(150, 125, 190, 125);

    doc.save("MedicalRecord.pdf");
  };

  return (
    <Modal
      title="Add Medical Record"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Add Record
        </Button>,
        <Button key="download" type="default" onClick={downloadPDF}>
          Download as PDF
        </Button>,
      ]}
    >
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <Input
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Symptoms"
        style={{ marginTop: "10px" }}
      />
      <Input
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        placeholder="Diagnosis"
        style={{ marginTop: "10px" }}
      />
      <Input
        value={result}
        onChange={(e) => setResult(e.target.value)}
        placeholder="Result"
        style={{ marginTop: "10px" }}
      />
    </Modal>
  );
};

export default MedicalRecordModal;
