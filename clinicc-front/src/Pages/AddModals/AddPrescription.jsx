import React, { useState } from 'react';
import { Modal, Button, Input, notification } from 'antd';
import axios from "axios";
import { jsPDF } from "jspdf";
import moment from "moment";


const PrescriptionModal = ({ patient, visible, onClose, onAdded }) => {
    const token1 = localStorage.getItem("accessToken");
    const dentist1 = (() => {
        try {
          return JSON.parse(localStorage.getItem("dentist")) || {};
        } catch {
          console.error("Invalid dentist data in localStorage");
          return {};
        }
      })();
    const [diagnosis, setDiagnosis] = useState('');
    const [medicine, setMedicine] = useState('');

    const handleSubmit = async () => {

        const prescriptionData = {
            diagnoza: diagnosis,
            medicina: medicine,
            patientId: patient.patientId,
            dentistId: dentist1.dentistId 
        };

        try {
            await axios.post(
                `https://localhost:7201/api/Prescription`,
                prescriptionData,
                {
                  headers: { Authorization: `Bearer ${token1}` },
                }
              );
            onAdded(); // Call the onAdded callback to refetch data
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error adding prescription:', error);
            notification.error({
                message: 'Error',
                description: 'There was an error adding the prescription.',
            });
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const currentDate = moment().format("MMMM Do YYYY");
    
        // Add Title and Patient Information
        doc.setFontSize(18);
        doc.setTextColor(34, 139, 34);
        doc.text("Patient Prescription", 14, 20);
    
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
    
        // Add Prescription Data
        doc.setFontSize(14);
        doc.setTextColor(255, 0, 0);
        doc.text("Prescription", 14, 90);
        doc.setDrawColor(255, 0, 0);
        doc.line(14, 92, 200, 92);
    
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text("Diagnoza:", 14, 100);
        doc.setFont("helvetica", "normal");
        doc.text(`${diagnosis}`, 50, 100);
    
        doc.setFont("helvetica", "bold");
        doc.text("Medicina:", 14, 110);
        doc.setFont("helvetica", "normal");
        doc.text(`${medicine}`, 50, 110);

    
        // Add Dentist Information
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Dentist Name:", 150, 100);
        doc.setFont("helvetica", "normal");
        doc.text(`${dentist1.emri} ${dentist1.mbiemri}`, 150, 110);
    
        doc.setFont("helvetica", "bold");
        doc.text("Signature:", 150, 120);
        doc.line(150, 125, 190, 125);
    
        // Save the PDF
        doc.save("Prescription.pdf");
      };

    return (
        <Modal
            title="Add Prescription"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Add Prescription
                </Button>,
                 <Button key="download" type="default" onClick={downloadPDF}>
                          Download as PDF
                </Button>
            ]}
        >
            <Input
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Diagnosis"
            />
            <Input
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
                placeholder="Medicine"
                style={{ marginTop: '10px' }}
            />
        </Modal>
    );
};

export default PrescriptionModal;
