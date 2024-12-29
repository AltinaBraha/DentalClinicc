import React, { useEffect, useState } from "react";
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import './Nav.css';
import { Link } from "react-router-dom";
import logo from '../../Assets/logoo.png'
import { FaUser } from "react-icons/fa";

function Navbars() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const userRole = localStorage.getItem("role");
        setRole(userRole); // Retrieve the role from localStorage
    }, []);

    const handleLogout = () => {
        localStorage.clear(); // Clear all stored data on logout
        window.location.href = "/Login"; // Redirect to login page
    };


    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand href="/Home">
                    <img id="logo" src={logo} alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Knowledge">Knowledge</Nav.Link>
                        <Nav.Link href="/Marketing">Marketing</Nav.Link>
                        <Nav.Link href="/Contact">Contact Us</Nav.Link>
                        
                        {/* Links based on user role */}
                        {(role === "Dentist" || role === "Admin") && (
                            <Link to="/Patients" className="nav-link">
                                <span>Patients</span>
                            </Link>
                        )}

                        {(role === "Dentist" || role === "Admin") &&(
                            <Link to="/dashboard" className="nav-link">
                                <span>Dashboard</span>
                            </Link>
                        )}
                        
                        {(role === "Patient" || role === "Admin") && (
                            <Link to="/Dentists" className="nav-link">
                                <span>Dentists</span>
                            </Link>
                        )}
                        
                        <NavDropdown title={<FaUser />} id="basic-nav-dropdown">
                        {role === "Patient" && (
                            <NavDropdown.Item as={Link} to="/PatientProfile">
                                My Profile
                            </NavDropdown.Item>
                        )}
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout} as={Link} to="/">
                            Logout
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbars;
