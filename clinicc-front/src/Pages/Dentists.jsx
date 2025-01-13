import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Table } from 'antd';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import './CSS/Dentists.css';
import DentistModal from './DentistModal';

const Dentists = () => {
    const [dentists, setDentists] = useState([]); 
    const [selectedDentist, setSelectedDentist] = useState(null); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [loading, setLoading] = useState(false); 
    const [departments, setDepartments] = useState([]); 
    const [loadingDepartments, setLoadingDepartments] = useState(false); 
    const [error, setError] = useState(null); 

    const notify = (message) => toast(message);

    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchDepartments = async () => {
            setLoadingDepartments(true);
            try {
                const response = await axios.get('https://localhost:7201/api/Department', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const Ddata = response.data?.$values || [];
                console.log("Departments data: ", Ddata);  
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
                console.log("Dentists data: ", dentistsData);  
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
        fetchDepartments(); 
    
    }, [token]);
    

    const searchDentists = (searchTerm) => {
        console.log('Filtering dentists with search term:', searchTerm); 
        const filteredDentists = dentists.filter(dentist => 
            dentist.emri.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dentist.mbiemri.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log('Filtered Dentists:', filteredDentists); 
        setDentists(filteredDentists);
    };

    const handleSearch = async (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        console.log('Search value:', searchValue); 
    
        if (searchValue === '') {
            setLoading(true);
            try {
                console.log('Fetching all dentists...');
                const response = await axios.get('https://localhost:7201/api/Dentist', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('API Response:', response.data); 
                setDentists(response.data?.$values || []);
            } catch (error) {
                console.error("Failed to fetch dentists:", error);
                notify("Failed to fetch dentists");
                setError("Failed to fetch dentists");
            } finally {
                setLoading(false);
            }
        } else {
            searchDentists(searchValue);
        }
    };
    

    
    
    const handleCheck = (dentist) => {
        setSelectedDentist(dentist);
    };

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
                        return department.emri; 
                    } else {
                        return 'N/A'; 
                    }
                },
            },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <button class="check" onClick={() => handleCheck(record)}>Check</button>
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
