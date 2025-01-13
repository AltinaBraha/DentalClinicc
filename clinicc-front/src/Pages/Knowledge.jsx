import React from "react";
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import KnowledgePic1 from "../Assets/Knowledge1.png"; 
import KnowledgePic2 from "../Assets/Knowledge2.png"; 
import KnowledgePic3 from "../Assets/Knowledge3.png"; 
import KnowledgePic4 from "../Assets/Knowledge4.png"; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./CSS/Knowledge.css";

const Knowledge = () => {
    const sections = [
        {
            title: "Welcome To Our Dental Clinic Knowledge",
            icon: "fas fa-tooth",
            content: `We have been heavily involved in the dental community for over 5 years. 
                      We have attended countless CE courses related to dental implants, oral surgery, 
                      and complex dental cases. That's why we've created this section to provide you 
                      with essential knowledge on maintaining excellent oral health.`,
            imgSrc: KnowledgePic1,
            imgAlt: "Dental Clinic Knowledge",
        },
        {
            title: "Why Is Dental Care Important?",
            icon: "fas fa-heart",
            content: `Good oral hygiene is crucial not only for your smile but also for your overall health. 
                      Neglecting dental care can lead to problems such as cavities, gum disease, and even more 
                      serious issues like heart disease. Regular dental visits can prevent these issues, allowing 
                      you to enjoy a lifetime of healthy teeth.`,
            imgSrc: KnowledgePic2,
            imgAlt: "Dental Care Importance",
        },
        {
            title: "Tips for Maintaining Oral Health",
            icon: "fas fa-lightbulb",
            content: (
                <ul>
                    <li>Brush Twice a Day: Use fluoride toothpaste and brush for two minutes.</li>
                    <li>Healthy Diet: Avoid sugary snacks and drinks that can contribute to tooth decay.</li>
                    <li>Visit Your Dentist Regularly: Professional cleanings and check-ups are key to preventing dental problems.</li>
                </ul>
            ),
            imgSrc: KnowledgePic3,
            imgAlt: "Oral Health Tips",
        },
        {
            title: "Advanced Technology",
            icon: "fas fa-tools",
            content: `We use cutting-edge technology such as digital X-rays, 3D imaging, and laser dentistry to 
                      make your visit as comfortable and effective as possible. Our goal is to provide pain-free 
                      treatments and help you achieve the best possible dental outcomes.`,
            imgSrc: KnowledgePic4,
            imgAlt: "Advanced Technology",
        },
    ];

    return (
        <>
            <Navbar />
            <section className="knowledge-section">
                <div className="knowledge-container">
                    <h3>Knowledge</h3>
                </div>
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className={`content-container ${index % 2 !== 0 ? "reverse" : ""}`}
                    >
                        <div className="text-container">
                            <h4 className="title">
                                <i className={section.icon}></i> {section.title}
                            </h4>
                            <p>{section.content}</p>
                        </div>
                        <div className="image-container">
                            <img src={section.imgSrc} alt={section.imgAlt} className="Knowledge-pic" />
                        </div>
                    </div>
                ))}
            </section>
            <Footer />
        </>
    );
};

export default Knowledge;