import React, { useState, useEffect } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { SlUserFollow } from "react-icons/sl";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import { FaUserMd } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { MdDashboardCustomize } from "react-icons/md";
import "../CSS/CommonCSS.css";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }
  const handleLogout = () => {
    localStorage.clear(); 
    window.location.href = "/Login"; 
  };

  const token1 = localStorage.getItem("accessToken");
  const dentist1 = (() => {
    try {
      return JSON.parse(localStorage.getItem("dentist")) || {};
    } catch {
      console.error("Invalid patient data in localStorage");
      return {};
    }
  })();
  const admin1 = (() => {
    try {
      return JSON.parse(localStorage.getItem("admin")) || {};
    } catch {
      console.error("Invalid patient data in localStorage");
      return {};
    }
  })();
  
  const user = admin1;
  const user1 = dentist1;





  return (
    <>
      <div>
        <div style={{ width: isOpen ? "200px" : "70px" }} className={`sidebar1`}>
          <div className="top_section1">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo1">
              Menu
            </h1>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars1"
            >
              <ImMenu onClick={toggle} style={{ cursor: "pointer1" }} />
            </div>
          </div>
          <div className="bottomSection">
            <Link className="link1" activeclassname="active" to={"/Home"}>
              <div className="icon1">
                <MdHome className="mainIcon1" />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text1"
              >
                Home
              </div>
            </Link>
            <Link className="link1" activeclassname="active" to={"/dashboard"}>
              <div className="icon1">
                <MdDashboardCustomize className="mainIcon1" />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text1"
              >
                DashBoard
              </div>
            </Link>

            {user?.adminId ? (
              <Link
                className="link1"
                activeclassname="active"
                to={"/Add_Patient"}
              >
                <div className="icon1">
                  <FaUserMd className="mainIcon1" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text1"
                >
                  Add Patient
                </div>
              </Link>
            ) : null}
            
            {user?.adminId ? (
              <Link
                className="link1"
                activeclassname="active"
                to={"/Add_Termini"}
              >
                <div className="icon1">
                  <BsBookmarkPlus className="mainIcon1" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text1"
                >
                  Add Appointment
                </div>
              </Link>
            ) : null}
            {user?.adminId ? (
              <Link className="link1" activeclassname="active" to={"/Add_Dentist"}>
                <div className="icon1">
                  <AiOutlineUserAdd className="mainIcon1" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text1"
                >
                  Add Dentist
                </div>
              </Link>
            ) : null}

            {user?.adminId ? (
              <Link className="link1" activeclassname="active" to={"/Add_Admin"}>
                <div className="icon1">
                  <RiAdminLine
                    className="mainIcon1"
                    style={{ color: "white" }}
                  />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text11"
                >
                  Add Admin
                </div>
              </Link>
            ) : null}


            {!user?.adminId ? (
              <Link
                className="link1"
                activeclassname="active"
                to={"/DentistProfile"}
              >
                <div className="icon1">
                  <SlUserFollow className="mainIcon1" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text1"
                >
                  Profile
                </div>
              </Link>
            ) : null}
           
            {!user?.adminId ? (
              <Link
                className="link1"
                activeclassname="active"
                to={"/checkappointment"}
              >
                <div className="icon1">
                  <BsFillBookmarkCheckFill className="mainIcon1" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text1"
                >
                  Appointments
                </div>
              </Link>
            ) : null}
            

            <Link
              className="LogOutPath1 link1"
              onClick={handleLogout} as={Link} to="/"
            >
              <div className="icon1">
                <FiLogOut />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text1"
              >
                Logout
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
