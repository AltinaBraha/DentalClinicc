import React from 'react';
import logo from '../../Assets/logoo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';
const Footer = () => {

    return (
        <footer>

            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6">
                        <img src={logo} className="footerlogo" />
                        <p>We Provide Teeth Care Solution</p>
                        <div className="footer-contact">
                            <div className="footer-icon">
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <div className="footer-text">
                                <h6>Contact Us</h6>
                                <h4>+38344111222</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <h2>Quick Links</h2>
                        <ul>
                            <li><a href="#">Knowledge</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Marketing</a></li>
                            <li><a href="#">Partners</a></li>
                            <li><a href="#">Services</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <h2>Our Services</h2>
                        <ul>
                            <li><a href="#">Dental Care</a></li>
                            <li><a href="#">Preventive Care</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <h2>Subscribe</h2>
                        <form>
                            <input type="email" placeholder="Enter Email"></input>
                            <button type="submit">Subsribe</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <span>Copyright 2024</span>
                        </div>
                    </div>

                </div>
            </div>
        </footer>


    )
};




export default Footer;