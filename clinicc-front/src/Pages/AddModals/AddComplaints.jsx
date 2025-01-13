import React, { useState } from 'react';
import { Modal, Button, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const ComplaintModal = ({ dentist, visible, onClose }) => {
    const navigate = useNavigate();
    const [complaint, setComplaint] = useState('');

    const patient1 = (() => {
        try {
            return JSON.parse(localStorage.getItem("patient")) || {};
        } catch {
            console.error("Invalid patient data in localStorage");
            return {};
        }
    })();
    const role = localStorage.getItem("role");
    console.log(role);
    console.log(patient1);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async () => {
        const complaintData = {
            ankesa: complaint,
            dentistId: dentist.dentistId,
            patientId: patient1.patientId
        };
        const token = localStorage.getItem("accessToken");
        if (!token || role !== "Patient") {
            setErrorMessage(
              role !== "Patient"
                ? "Ju nuk jeni të autorizuar të përdorni këtë formë."
                : "Ju nuk jeni autentikuar. Ju lutem kyçuni."
            );
            return;
        }

        try {
            const response = await axios.post(
                'https://localhost:7201/api/Complaints', 
                complaintData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    }
                }
            );

            if (response.status === 201) {
                notification.success({
                    message: 'Success',
                    description: 'Complaint submitted successfully.',
                });
                onClose(); 
                navigate('/Dentists'); 
            } else {
                notification.error({
                    message: 'Error',
                    description: 'There was an error submitting your complaint.',
                });
            }
        } catch (error) {
            console.error('Error submitting complaint:', error);
            notification.error({
                message: 'Error',
                description: 'There was an error submitting your complaint.',
            });
        }
    };

    return (
        <Modal
            title="Make a Complaint"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Submit Complaint
                </Button>
            ]}
        >
            <Input.TextArea
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                rows={4}
                placeholder="Enter your complaint here"
            />
        </Modal>
    );
};

export default ComplaintModal;
