import React, { useState } from 'react';
import { Modal, Button, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
//import { useSelector } from 'react-redux'; // Use useSelector to get data from Redux

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
    const token = localStorage.getItem("accessToken");
    // Function to handle complaint submission to backend
    const handleSubmit = async () => {
        const complaintData = {
            ankesa: complaint,
            dentistId: dentist.dentistId,
            patientId: patient1.patientId
        };

        try {
            // Use axios to make a POST request
            const response = await axios.post(
                'https://localhost:7201/api/Complaints', // API endpoint for creating complaints
                complaintData, // Data to send
                {
                    headers: {
                        Authorization: `Bearer ${patient1.token}`, // Send the patient's token for authentication
                    }
                }
            );

            if (response.status === 201) {
                notification.success({
                    message: 'Success',
                    description: 'Complaint submitted successfully.',
                });
                onClose(); // Close modal after submission
                navigate('/Dentists'); // Navigate to the Dentists page
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
