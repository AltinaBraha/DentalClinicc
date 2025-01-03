import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import axios from 'axios';
import PatientModal from './PatientModal';
import './CSS/Patients.css';

const Patients = () => {
    const token1 = localStorage.getItem("accessToken");
    const dentist1 = (() => {
        try {
          return JSON.parse(localStorage.getItem("dentist")) || {};
        } catch {
          console.error("Invalid dentist data in localStorage");
          return {};
        }
      })();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const notify = (message) => toast(message);

    console.log('Token in patients', token1);


    // Fetch all patients initially
    useEffect(() => {
        const fetchPatients = async () => {
          try {
            const response = await axios.get(`https://localhost:7201/api/Patient/byDentist/${dentist1.dentistId}`, {
              headers: { Authorization: `Bearer ${token1}` },
            });
            const patientsData = response.data?.$values || [];
            console.log(patientsData);
            setPatients(patientsData);
          } catch (error) {
            console.error("Failed to fetch patients:", error);
            notify("Failed to fetch patients");
          }
        };
    
        if (token1) fetchPatients();
    }, [token1]);

      const searchPatients = (searchTerm) => {
        console.log('Filtering Patients with search term:', searchTerm); // Log the search term
        const filteredPatients = patients.filter(patient => 
            patient.emri.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.mbiemri.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log('Filtered Patients:', filteredPatients); // Log the filtered results
        setPatients(filteredPatients);
     };


    const handleSearch = async (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        console.log('Search value:', searchValue); // Log the search term to ensure it's being captured
    
        // If search term is empty, fetch all dentists from the API
        if (searchValue === '') {
            setLoading(true);
            try {
                console.log('Fetching all patients...');
                const response = await axios.get(`https://localhost:7201/api/Patient/byDentist/${dentist1.dentistId}`, {
                    headers: { Authorization: `Bearer ${token1}` },
                });
                console.log('API Response:', response.data); // Log API response for debugging
                setPatients(response.data?.$values || []);
            } catch (error) {
                console.error("Failed to fetch patients:", error);
                notify("Failed to fetch patients");
                setError("Failed to fetch patients");
            } finally {
                setLoading(false);
            }
        } else {
            // Otherwise, filter dentists based on the search term
            searchPatients(searchValue);
        }
    };


    const handleCheck = (patient) => {
        try {
            console.log("Selected patient:", patient);
            setSelectedPatient(patient);
        } catch (error) {
            console.error("Error handling patient check:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <input
                type="text"
                placeholder="Search patients by name..."
                value={searchTerm}
                onChange={handleSearch}  // Call handleSearch when typing
            />
            <div className="background">
                <h1>Patients</h1>
                {loading && <p>Loading...</p>}
                {error && <p>{typeof error === 'string' ? error : 'An error occurred'}</p>}
                <div className="patient-list">
                    {patients.length > 0 ? (
                        patients.map((patient) => (
                            <div key={patient.patientId} className="patient-card">
                                <h2>{patient.emri} {patient.mbiemri}</h2>
                                <p><strong>Patient ID:</strong> {patient.patientId}</p>
                                <p><strong>Mosha:</strong> {patient.mosha}</p>
                                <p><strong>Nr. Telefonit:</strong> {patient.nrTelefonit}</p>
                                <p><strong>Email:</strong> {patient.email || 'N/A'}</p>
                                <button onClick={() => handleCheck(patient)}>Check</button>
                            </div>
                        ))
                    ) : (
                        <p>No patients available.</p>
                    )}
                </div>
                {selectedPatient && (
                    <PatientModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Patients;
