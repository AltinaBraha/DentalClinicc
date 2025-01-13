import about1 from '../Assets/img1.jpg';
import about2 from '../Assets/img2.jpg';
import about3 from '../Assets/img3.jpg';
import { FaAmbulance, FaBed, FaSyringe } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import "./CSS/AboutUs.css";
function About() {
    return (
        <div>
            <section className="section about-area">
                <div className="container-fluid">
                    <div className="row align-items-center" id='row'>
                        <div className="col-lg-6 mb-30">
                            <div className="about-images">
                                <ul>
                                    <li>
                                        <img className="img1" src={about1} alt="img" />
                                    </li>
                                    <li>
                                        <img className="img2" src={about2} alt="img" />
                                    </li>
                                    <li>
                                        <img className="img3" src={about3} alt="img" />
                                    </li>
                                    <li>
                                        <div className="exp-bx">
                                            10
                                            <span>Years of Experience</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-30">
                            <div className="heading-bx">
                                <h6>About Us</h6>
                                <h2 className="title">
                                The Great Place Of Dental Clinic Center
                                </h2>
                                <p>
                                We provide the special tips and advices of teeth care
                                    treatment and high level of best technology involve in the our
                                    clinic.
                                </p>
                            </div>
                            
                            <div></div>
                            <div className="row">
                                <div className="col-lg-6 col-sm-6 mb-30">
                                    <div className="feature1">
                                        <div className="icon-md">
                                            <span className="icon-cell">
                                                <FaAmbulance />
                                            </span>
                                        </div>
                                        <div className="icon-content">
                                            <h4>Emergency Help</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6 mb-30">
                                    <div className="feature1">
                                        <div className="icon-md">
                                            <span className="icon-cell">
                                                <FaBed />
                                            </span>
                                        </div>
                                        <div className="icon-content">
                                            <h4>Qualified Doctors</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6 mb-30">
                                    <div className="feature1">
                                        <div className="icon-md">
                                            <span className="icon-cell">
                                                <IoWater />
                                            </span>
                                        </div>
                                        <div className="icon-content">
                                            <h4>Best Professionals</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6 mb-30">
                                    <div className="feature1">
                                        <div className="icon-md">
                                            <span className="icon-cell">
                                                <FaSyringe />
                                            </span>
                                        </div>
                                        <div className="icon-content">
                                            <h4>Medical Treatment</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;