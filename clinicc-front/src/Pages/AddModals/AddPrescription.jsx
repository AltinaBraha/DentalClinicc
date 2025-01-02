import React, { useState } from 'react';
import { Modal, Button, Input, notification } from 'antd';
import axios from "axios";


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
