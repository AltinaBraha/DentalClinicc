import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Modal, Button, Rate, notification, Input } from 'antd';
import axios from 'axios'; // Import axios për kërkesa API

const RatingModal = ({ dentist, visible, onClose }) => {
    const navigate = useNavigate();
    const [serviceRating, setServiceRating] = useState(0);
    const [behaviourRating, setBehaviourRating] = useState(0);
    const [service, setService] = useState('');
    const [behaviour, setBehaviour] = useState('');

    const patient1 = (() => {
        try {
            return JSON.parse(localStorage.getItem("patient")) || {};
        } catch {
            console.error("Invalid patient data in localStorage");
            return {};
        }
    })();
    const token = localStorage.getItem("accessToken");

    const handleSubmit = async () => {
        const ratingData = {
            sherbimi: service,
            sjellja: behaviour,
            dentistId: dentist.dentistId,
            patientId: patient1.patientId,
            serviceRating,
            behaviourRating
        };

        try {
            // Përdorim axios për të bërë kërkesë POST për të krijuar një vlerësim
            const response = await axios.post(
                'https://localhost:7201/api/rating', // Endpoint-i i API-së që do të thirret
                ratingData, // Të dhënat që dërgohen në API
                {
                    headers: {
                        Authorization: `Bearer ${patient1.token}`, // Dërgojmë token-in për autentifikim
                    }
                }
            );

            if (response.status === 201) {
                notification.success({
                    message: 'Success',
                    description: 'Rating submitted successfully.',
                });
                onClose(); // Mbyll modalin pas dorëzimit
                navigate('/Dentists'); // Kthehu në faqen e dentistëve
            } else {
                notification.error({
                    message: 'Error',
                    description: 'There was an error submitting your rating.',
                });
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            notification.error({
                message: 'Error',
                description: 'There was an error submitting your rating.',
            });
        }
    };

    return (
        <Modal
            title="Rate the Dentist"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Submit Rating
                </Button>
            ]}
        >
            <Input.TextArea
                value={service}
                onChange={(e) => setService(e.target.value)}
                rows={4}
                placeholder="Enter your opinion on service here"
            />
            <Rate
                value={serviceRating}
                onChange={setServiceRating}
                tooltips={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
                style={{ marginTop: '10px' }}
            />
            <Input.TextArea
                value={behaviour}
                onChange={(e) => setBehaviour(e.target.value)}
                rows={4}
                placeholder="Enter your opinion on behaviour here"
                style={{ marginTop: '10px' }}
            />
            <Rate
                value={behaviourRating}
                onChange={setBehaviourRating}
                tooltips={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
                style={{ marginTop: '10px' }}
            />
        </Modal>
    );
};

export default RatingModal;
