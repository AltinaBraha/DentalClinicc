import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import ComplaintModal from './AddModals/AddComplaints'; // Import the updated complaint modal
import RatingModal from './AddModals/AddRating'; // Import the updated rating modal

const DentistModal = ({ dentist, onClose, departments }) => {
    const [isComplaintVisible, setIsComplaintVisible] = useState(false);
    const [isRatingVisible, setIsRatingVisible] = useState(false);

    const openComplaintModal = () => {
        setIsComplaintVisible(true);
    };

    const openRatingModal = () => {
        setIsRatingVisible(true);
    };

    const handleComplaintClose = () => {
        setIsComplaintVisible(false);
    };

    const handleRatingClose = () => {
        setIsRatingVisible(false);
    };

    // Debugging - log the department array and dentist object
    //console.log('Departments:', departments); // Check the departments data
   // console.log('Dentist DepartmentId:', dentist?.departmentId); // Check the departmentId in dentist object

 

    return (
        <>
            <Modal
                title={`Dentist: ${dentist?.emriMbiemri}`}
                open={!!dentist}
                onCancel={onClose}
                footer={null} // Remove default footer to customize
                centered
                className="dentist-modal"
            >
                <div className="modal-content">
                    <p><strong>Name:</strong> {dentist?.emri || 'N/A'}</p>
                    <p><strong>Surname:</strong> {dentist?.mbiemri || 'N/A'}</p>
                    <p><strong>Specialization:</strong> {dentist?.specializimi || 'N/A'}</p>
                    <p><strong>Start Time:</strong> {dentist?.oraFillimit || 'N/A'}</p>
                    <p><strong>End Time:</strong> {dentist?.oraMbarimit || 'N/A'}</p>
                    <p><strong>Department:</strong> {dentist?.Department ? dentist.Department.Emri : 'N/A'}</p>
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
                    <Button
                        key="rate"
                        type="default"
                        onClick={openRatingModal}
                    >
                        Rate Dentist
                    </Button>
                </div>
            </Modal>

            {/* Complaint Modal */}
            <ComplaintModal
                dentist={dentist}
                visible={isComplaintVisible}
                onClose={handleComplaintClose}
            />

            {/* Rating Modal */}
            <RatingModal
                dentist={dentist}
                visible={isRatingVisible}
                onClose={handleRatingClose}
            />
        </>
    );
};

export default DentistModal;
