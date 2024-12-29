import React from 'react';
import bracesIcon from '../Assets/braces.png';
import implantIcon from '../Assets/implants.png';
import teethIcon from '../Assets/teeth-removal.png';
import bridgesCrownsIcon from '../Assets/crowns&bridges2.png';
import checkUpIcon from '../Assets/tooth-checkup.png';
import whiteningIcon from '../Assets/whitening-teeth.png';
import rootCanalIcon from '../Assets/root-canal.png';
import cleaningIcon from '../Assets/cleaning-teeth.png';
import './CSS/AboutUs.css';

const Service = () => {
    return(
        <section className="departament_section layout_padding">
        <div className="departament_container">
            <div className="container">
                <div className="heading_container heading_center">
                    <h3>Our Services</h3>
                    <p>We provide the special tips and advice’s of teeth care.</p>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="box">
                            <div className="img-box">
                                <img src={bracesIcon} alt="Braces" />
                            </div>
                            <div className="detail-box">
                                <h5>BRACES</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box">
                            <div className="img-box">
                                <img src={implantIcon} alt="Implants" />
                            </div>
                            <div className="detail-box">
                                <h5>IMPLANTS</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box">
                            <div className="img-box">
                                <img src={teethIcon} alt="Teeth Removal" />
                            </div>
                            <div className="detail-box">
                                <h5>TEETH REMOVAL</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box">
                            <div className="img-box">
                                <img src={bridgesCrownsIcon} alt="Crowns & Bridges" />
                            </div>
                            <div className="detail-box">
                                <h5>CROWNS & BRIDGES</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box">
                            <div className="img-box">
                                <img src={checkUpIcon} alt="Tooth Checkup" />
                            </div>
                            <div className="detail-box">
                                <h5>TOOTH CHECKUP</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box">
                            <div className="img-box">
                                <img src={whiteningIcon} alt="Whitening Teeth" />
                            </div>
                            <div className="detail-box">
                                <h5>WHITENING TEETH</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box">
                            <div className="img-box">
                                <img src={rootCanalIcon} alt="Root Canal" />
                            </div>
                            <div className="detail-box">
                                <h5>ROOT CANAL</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box">
                            <div className="img-box">
                                <img src={cleaningIcon} alt="Cleaning Teeth" />
                            </div>
                            <div className="detail-box">
                                <h5>CLEANING TEETH</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-box">
                    <a href="#">View All</a>
                </div>
            </div>
        </div>
    </section>

)
};
export default Service;