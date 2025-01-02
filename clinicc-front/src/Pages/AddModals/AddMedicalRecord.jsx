import React, { useState } from 'react';
import { Modal, Button, Input, notification } from 'antd';
import axios from "axios";

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

    const [description, setDescription] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async () => {

        const medicalRecordData = {
            pershkrimi: description,
            symptoms: symptoms,
            diagnosis: diagnosis,
            results: result,
            patientId: patient.patientId, 
            dentistId: dentist1.dentistId
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
            console.error('Error adding medical record:', error);
            notification.error({
                message: 'Error',
                description: 'There was an error adding the medical record.',
            });
        }
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
                </Button>
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
                style={{ marginTop: '10px' }}
            />
            <Input
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Diagnosis"
                style={{ marginTop: '10px' }}
            />
            <Input
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="Result"
                style={{ marginTop: '10px' }}
            />
        </Modal>
    );
};

export default MedicalRecordModal;
