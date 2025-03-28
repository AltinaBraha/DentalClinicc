import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import { EditFilled, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import MedicalRecordModal from "./AddModals/AddMedicalRecord";
import PrescriptionModal from "./AddModals/AddPrescription";
import "./CSS/PatientModal.css";

const PatientModal = ({ patient, onClose }) => {
  const token1 = localStorage.getItem("accessToken");
  console.log(patient);
  const [isMedicalRecordVisible, setIsMedicalRecordVisible] = useState(false);
  const [isPrescriptionVisible, setIsPrescriptionVisible] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const refetchData = async () => {
    const patientId = patient?.patientId;
    try {
      const [medicalRecordsRes, prescriptionsRes] = await Promise.all([
        axios.get(`https://localhost:7201/api/MedicalRecord/patient/${patientId}`, {
          headers: { Authorization: `Bearer ${token1}` },
        }),
        axios.get(`https://localhost:7201/api/Prescription/patient/${patientId}`, {
          headers: { Authorization: `Bearer ${token1}` },
        }),
      ]);

      const medicalRecordsData = medicalRecordsRes.data["$values"];
      const prescriptionsData = prescriptionsRes.data["$values"];

      setMedicalRecords(medicalRecordsData);
      setPrescriptions(prescriptionsData);
    } catch (error) {
      console.error("Failed to refetch data:", error);
    }
  };

  const deletePrescription = async (prescriptionId) => {
    try {
      await axios.delete(`https://localhost:7201/api/Prescription/${prescriptionId}`, {
        headers: { Authorization: `Bearer ${token1}` },
      });
      setRefresh(!refresh); 
      console.log(`Prescription with ID ${prescriptionId} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete Prescription with ID ${prescriptionId}:`, error);
    }
  };

  const deleteMedicalRecord = async (medicalRecordId) => {
    try {
      await axios.delete(`https://localhost:7201/api/MedicalRecord/${medicalRecordId}`, {
        headers: { Authorization: `Bearer ${token1}` },
      });
      setRefresh(!refresh); 
      console.log(`Medical Record with ID ${medicalRecordId} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete Medical Record with ID ${medicalRecordId}:`, error);
    }
  };

  useEffect(() => {
    if (patient) {
      refetchData();
    }
  }, [patient, token1]);

  useEffect(() => {
    refetchData();
    }, [refresh]);

  return (
    <div className="patient-modal-window">
      <div className="patient-modal-header">
        <h2>Patient: {patient.emri} {patient.mbiemri}</h2>
        <Button onClick={onClose} className="close-btn">
          Close
        </Button>
      </div>

      <div className="patient-modal-body">
        <div className="patient-details">
          <p><strong>Patient ID:</strong> {patient.patientId}</p>
          <p><strong>Name:</strong> {patient.emri}</p>
          <p><strong>Surname:</strong> {patient.mbiemri}</p>
          <p><strong>Mosha:</strong> {patient.mosha}</p>
          <p><strong>Nr Telefonit:</strong> {patient.nrTelefonit}</p>
          <p><strong>Email:</strong> {patient.email}</p>
        </div>

        <div className="data-sections">
          <div className="data-section">
            <h3>Medical Records</h3>
            <ul>
              {medicalRecords.length > 0 ? (
                medicalRecords.map((record) => (
                  <div key={record.medicalRecordId}>
                    <p><strong>Record ID:</strong> {record.medicalRecordId}</p>
                    <p><strong>Description:</strong> {record.pershkrimi}</p>
                    <p><strong>Symptoms:</strong> {record.symptoms}</p>
                    <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                    <p><strong>Results:</strong> {record.results}</p>
                    <EditFilled className="edit"
                      onClick={() => navigate(`/EditMedicalRecordPatient/${record.medicalRecordId}`)}
                    />
                    <DeleteOutlined className="edit"
                      style={{ color: "red", marginLeft: 10 }}
                      onClick={() => deleteMedicalRecord(record.medicalRecordId)}
                    />
                  </div>
                ))
              ) : (
                <p>No medical records available for this patient.</p>
              )}
            </ul>
            <Button
              onClick={() => setIsMedicalRecordVisible(true)}
              className="add-btn"
            >
              Add Medical Record
            </Button>
          </div>

          <div className="data-section">
            <h3>Prescriptions</h3>
            <ul>
              {prescriptions.length > 0 ? (
                prescriptions.map((prescription) => (
                  <div key={prescription.prescriptionId}>
                    <p><strong>Prescription ID:</strong> {prescription.prescriptionId}</p>
                    <p><strong>Diagnosis:</strong> {prescription.diagnoza}</p>
                    <p><strong>Medicine:</strong> {prescription.medicina}</p>
                    <EditFilled className="edit"
                      onClick={() => navigate(`/EditPrescriptionPatient/${prescription.prescriptionId}`)}
                    />
                    <DeleteOutlined className="edit"
                      style={{ color: "red", marginLeft: 10 }}
                      onClick={() => deletePrescription(prescription.prescriptionId)}
                    />
                  </div>
                ))
              ) : (
                <p>No prescriptions available for this patient.</p>
              )}
            </ul>
            <Button
              onClick={() => setIsPrescriptionVisible(true)}
              className="add-btn"
            >
              Add Prescription
            </Button>
          </div>
        </div>
      </div>

      <MedicalRecordModal
        patient={patient}
        visible={isMedicalRecordVisible}
        onClose={() => setIsMedicalRecordVisible(false)}
        onAdded={refetchData}
      />
      <PrescriptionModal
        patient={patient}
        visible={isPrescriptionVisible}
        onClose={() => setIsPrescriptionVisible(false)}
        onAdded={refetchData}
      />
    </div>
  );
};

export default PatientModal;
