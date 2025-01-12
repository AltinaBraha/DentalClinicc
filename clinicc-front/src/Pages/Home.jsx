import React from 'react';
import foto1 from '../Assets/doctor.png';
import './CSS/Home.css';
import Navbar from '../Components/Navbar/Navbar';
import About from './About';
import Footer from '../Components/Footer/Footer';
import Services2 from './Service2';
import Service from './Service';
import { useEffect, useState } from "react";
import { Container} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";




const Home = () => {

    return (
        
        <><Navbar />
        <header>

            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 col-lg-6'>
                        <h5>Adding Care to your Life.</h5>
                        <h2>Protecting and Taking Care Of Your Teeth</h2>
                        <button><a href='#'>Read More</a></button>
                    </div>
                    <div className='col-lg-4 col-md-6'>
                        <div className="header-box">
                            <img src={foto1} />


                        </div>
                    </div>
                </div>
            </div>

        </header>
            <About></About>
            <Service></Service>
            <Services2></Services2>
            <Footer></Footer>

        </>
       

    )

};




export default Home;