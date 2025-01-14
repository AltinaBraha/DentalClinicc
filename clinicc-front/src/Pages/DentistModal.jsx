import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import axios from 'axios';
import ComplaintModal from './AddModals/AddComplaints'; // Import the updated complaint modal
import RatingModal from './AddModals/AddRating'; // Import the updated rating modal
const DentistModal = ({ dentist, onClose }) => {
    const [isComplaintVisible, setIsComplaintVisible] = useState(false);
    const [isRatingVisible, setIsRatingVisible] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [loadingDepartments, setLoadingDepartments] = useState(false);
    const token = localStorage.getItem("accessToken");
    const [error, setError] = useState(null);

    const department = departments.find(department => department.DepartmentId === dentist?.DepartmentId);

    const openComplaintModal = () => setIsComplaintVisible(true);
    const openRatingModal = () => setIsRatingVisible(true);
    const handleComplaintClose = () => setIsComplaintVisible(false);
    const handleRatingClose = () => setIsRatingVisible(false);

    useEffect(() => {
        const fetchDepartments = async () => {
            setLoadingDepartments(true);
            try {
                const response = await axios.get('https://localhost:7201/api/Department', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDepartments(response.data?.$values || []);
            } catch (error) {
                console.error("Failed to fetch departments:", error);
                setError("Failed to fetch departments");
            } finally {
                setLoadingDepartments(false);
            }
        };

        if (token) fetchDepartments();
    }, [token]);

    return (
        <Modal
            title={`Dentist: ${dentist?.emri} ${dentist?.mbiemri}`}
            open={!!dentist}
            onCancel={onClose}
            footer={null}
            centered
            className="dentist-modal"
        >
            <div className="modal-content">
                <p><strong>Name:</strong> {dentist?.emri || 'N/A'}</p>
                <p><strong>Surname:</strong> {dentist?.mbiemri || 'N/A'}</p>
                <p><strong>Specialization:</strong> {dentist?.specializimi || 'N/A'}</p>
                <p><strong>Start Time:</strong> {dentist?.oraFillimit || 'N/A'}</p>
                <p><strong>End Time:</strong> {dentist?.oraMbarimit || 'N/A'}</p>
                <p><strong>Department:</strong> {department?.emri || 'Department not available'}</p>
            </div>

            <div className="modal-footer" style={{ textAlign: 'right' }}>
                <Button
                    key="complaint"
                    type="primary"
                    onClick={openComplaintModal}
                    style={{ marginRight: 10 }}
                >
                    Make Complaint
                </Button>
                <Button key="rate" type="default" onClick={openRatingModal}>
                    Rate Dentist
                </Button>
            </div>

            <ComplaintModal
                dentist={dentist}
                visible={isComplaintVisible}
                onClose={handleComplaintClose}
            />

            <RatingModal
                dentist={dentist}
                visible={isRatingVisible}
                onClose={handleRatingClose}
            />
        </Modal>
    );
};
export default DentistModal;