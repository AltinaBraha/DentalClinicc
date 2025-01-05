import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Marketing.css';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

// Import assets with fallback handling
import HeroImage from '../Assets/heroImage.png';
import GeneralDentistryImg from '../Assets/GeneralDenistry.png';
import CosmeticDentistryImg from '../Assets/CosmeticSurgery.png';
import braces from '../Assets/braces.png';
import CheckupImg from '../Assets/RoutineCheckup.png';
import OcclusionImg from '../Assets/OcclusionCorrection.png';
import OralSurgeryImg from '../Assets/OralSurgery.png';
import Doctor1Img from '../Assets/doctor5.png';
import Doctor2Img from '../Assets/doctor3.png';
import Doctor3Img from '../Assets/doctor2.png';


const Marketing = () => {
  const navigate = useNavigate();

  const handleAppointmentClick = () => navigate('/appointment');
  const handleContactClick = () => navigate('/contact');

  // Services data
  const services = [
    { title: 'General Dentistry', img: GeneralDentistryImg, description: 'Comprehensive care for your oral health and prevention.' },
    { title: 'Cosmetic Dentistry', img: CosmeticDentistryImg, description: 'Enhance your smile with teeth whitening, veneers, and more.' },
    { title: 'Orthodontics', img: braces, description: 'Braces and aligners to straighten your teeth and improve functionality.' },
    { title: 'Routine Check-ups', img: CheckupImg, description: 'Regular oral health exams and professional cleaning to prevent gum disease and tooth decay.' },
    { title: 'Occlusion Correction', img: OcclusionImg, description: 'Treatment of issues related to bite and jaw function.' },
    { title: 'Oral Surgery', img: OralSurgeryImg, description: 'Procedures to remove damaged teeth or treat other advanced dental issues.' },
  ];

  // Doctors data
  const doctors = [
    { name: 'Dr. John Doe', img: Doctor1Img, specialty: 'General Dentistry', bio: 'Highly skilled dentist with years of experience.' },
    { name: 'Dr. Jane Smith', img: Doctor2Img, specialty: 'Cosmetic Dentistry', bio: 'Helps patients achieve their dream smile.' },
    { name: 'Dr. Mark Lee', img: Doctor3Img, specialty: 'Orthodontics', bio: 'Specializes in straightening and improving smiles.' },
  ];

  // Contact data
  const contacts = [
    { title: 'Phone', description: 'Call us at: +383 44 111 222' },
    { title: 'Email', description: 'dentalclinic@gmail.com' },
    { title: 'Location', description: 'Kosova, Prishtinë' },
  ];

  return (
    <>
      <Navbar />
      <div className="marketing-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Your Smile, Our Priority</h1>
            <p>
              Welcome to Dental Clinic! We provide top-quality dental care with a focus on your comfort and well-being.
              Our team of experienced professionals offers a range of services, from routine check-ups to advanced treatments,
              all tailored to meet your unique needs.
            </p>
          </div>
          <div className="hero-image-container">
            <img src={HeroImage || '/placeholder.png'} alt="Hero showcasing dental care" className="hero-image" />
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="what-we-offer-section">
  <h2 className="section-title">What We Offer</h2>
  <div className="row">
    {services.map((service, index) => (
      <div className="col" key={index}>
        <div className="service-card">
          <img src={service.img || '/placeholder.png'} alt={service.title} className="service-image" />
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      </div>
    ))}
  </div>
</section>



        {/* Our Doctors Section */}
        <section className="home23-sec_6">
          <div className="container">
            <div className="row text-center">
              <h2 className="col-12 mb-5">Meet Our Doctors</h2>
              <div id="doctorCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {doctors.map((doctor, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                      <div className="carousel-item-content">
                        <div className="carousel-image">
                          <img src={doctor.img || '/placeholder.png'} alt={`${doctor.name} - ${doctor.specialty}`} className="doctor-img" />
                        </div>
                        <div className="carousel-description">
                          <h3>{doctor.name}</h3>
                          <p><em>{doctor.specialty}</em></p>
                          <p>{doctor.bio}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#doctorCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#doctorCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Appointment Section */}
        <section className="appointment-section">
          <div className="appointment-content">
            <h2>Make Your Appointment</h2>
            <p>Your Smile Deserves the Best Care! Book your appointment now.</p>
            <button className="cta-button" onClick={handleAppointmentClick}>Book Now</button>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
  <h2 className="section-title">How You Can Contact Us</h2>
  <div className="row">
    {contacts.map((contact, index) => (
      <div className="col" key={index}>
        <div className="contact-card">
          <h3>{contact.title}</h3>
          <p>{contact.description}</p>
        </div>
      </div>
    ))}
  </div>
  <p className="contact-info-text">For more information or to reach us directly, feel free to contact us below:</p>
  <button className="cta-button" onClick={handleContactClick}>Contact Us</button>
</section>


        <Footer />
      </div>
    </>
  );
};

export default Marketing;
