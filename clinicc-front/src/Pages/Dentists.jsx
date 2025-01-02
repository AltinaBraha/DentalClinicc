import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Table } from 'antd';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import DentistModal from './DentistModal';
import './CSS/Dentists.css';

const Dentists = () => {
    const [dentists, setDentists] = useState([]); // State to hold dentists data
    const [selectedDentist, setSelectedDentist] = useState(null); // State for selected dentist
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const [loading, setLoading] = useState(false); // Loading state for dentists
    const [departments, setDepartments] = useState([]); // State for departments
    const [loadingDepartments, setLoadingDepartments] = useState(false); // Loading state for departments
    const [error, setError] = useState(null); // Error state

    const notify = (message) => toast(message);

    const token = localStorage.getItem("accessToken");

    // Fetch departments and dentists data
    useEffect(() => {
        const fetchDepartments = async () => {
            setLoadingDepartments(true);
            try {
                const response = await axios.get('https://localhost:7201/api/Department', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const Ddata = response.data?.$values || [];
                console.log("Departments data: ", Ddata);  // Log departments data
                setDepartments(Ddata);
            } catch (error) {
                console.error("Failed to fetch departments:", error);
                setError("Failed to fetch departments");
            } finally {
                setLoadingDepartments(false);
            }
        };
    
        const fetchDentists = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://localhost:7201/api/Dentist', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const dentistsData = response.data?.$values || [];
                console.log("Dentists data: ", dentistsData);  // Log dentists data
                setDentists(dentistsData);
            } catch (error) {
                console.error("Failed to fetch dentists:", error);
                notify("Failed to fetch dentists");
                setError("Failed to fetch dentists");
            } finally {
                setLoading(false);
            }
        };
    
        if (token) {
            fetchDentists();
        }
        fetchDepartments(); // Fetch departments in parallel
    
    }, [token]);
    

    // Fetch dentists based on search term
    const searchDentists = (searchTerm) => {
        console.log('Filtering dentists with search term:', searchTerm); // Log the search term
        const filteredDentists = dentists.filter(dentist => 
            dentist.emri.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dentist.mbiemri.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log('Filtered Dentists:', filteredDentists); // Log the filtered results
        setDentists(filteredDentists);
    };

    // Handle search input change
    const handleSearch = async (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        console.log('Search value:', searchValue); // Log the search term to ensure it's being captured
    
        // If search term is empty, fetch all dentists from the API
        if (searchValue === '') {
            setLoading(true);
            try {
                console.log('Fetching all dentists...');
                const response = await axios.get('https://localhost:7201/api/Dentist', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('API Response:', response.data); // Log API response for debugging
                setDentists(response.data?.$values || []);
            } catch (error) {
                console.error("Failed to fetch dentists:", error);
                notify("Failed to fetch dentists");
                setError("Failed to fetch dentists");
            } finally {
                setLoading(false);
            }
        } else {
            // Otherwise, filter dentists based on the search term
            searchDentists(searchValue);
        }
    };
    

    
    

    // Handle dentist selection for modal
    const handleCheck = (dentist) => {
        setSelectedDentist(dentist);
    };

    // Table columns definition
    const columns = [
        { title: "Name", dataIndex: "emri", key: "emri" },
        { title: "Surname", dataIndex: "mbiemri", key: "mbiemri" },
        { title: "Specialization", dataIndex: "specializimi", key: "specializimi" },
        { title: "Start Time", dataIndex: "oraFillimit", key: "oraFillimit" },
        { title: "End Time", dataIndex: "oraMbarimit", key: "oraMbarimit" },
            {
                title: "Department",
                dataIndex: "DepartmentId",
                key: "Department",
                render: (departmentId) => {
                    const department = departments.find(department => department.DepartmentId === departmentId);
                    if (department) {
                        return department.emri; // Display department name
                    } else {
                        return 'N/A'; // Fallback in case department is not found
                    }
                },
            },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <button onClick={() => handleCheck(record)}>Check</button>
            ),
        },
    ];
    

    return (
        <div>
            <Navbar />
            <ToastContainer />
            <input
                type="text"
                placeholder="Search dentists by name..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="background">
                <h1>Dentists</h1>
                {loading && <p>Loading dentists...</p>}
                {loadingDepartments && <p>Loading departments...</p>}
                {error && <p>{error}</p>}
                <div className="table-container">
                    <Table columns={columns} dataSource={dentists} rowKey="dentistId" />
                </div>

                {selectedDentist && (
                    <DentistModal
                        dentist={selectedDentist}
                        onClose={() => setSelectedDentist(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default Dentists;
