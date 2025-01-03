import './App.css';
import Footer from './Components/Footer/Footer';
import About from './Pages/About';
import Login from './Pages/Login';
import Services2 from './Pages/Service2';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import PatientProfile from './Pages/PatientProfile';
import Appointment from './Pages/Appointment';
import Dentists from './Pages/Dentists';
import DentistModal from './Pages/DentistModal';
import AddComplaints from './Pages/AddModals/AddComplaints';
import AddRating from './Pages/AddModals/AddRating';
import Patients from './Pages/Patients';
import Knowledge from './Pages/Knowledge';




import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
            <Routes>
              <Route path="/Login" element={<Login/>}/>
              <Route path="/" element={<Register/>}/>
              <Route path="/About" element={<About />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Services2" element={<Services2 />} />
              <Route path="/Footer" element={<Footer />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/PatientProfile" element={<PatientProfile />} />
              <Route path="/Appointment" element={<Appointment />} />
              <Route path="/Dentists" element={<Dentists />} />
              <Route path="/DentistModal" element={<DentistModal />} />
              <Route path="/AddComplainits" element={<AddComplaints />} />
              <Route path="/AddRating" element={<AddRating />} />
              <Route path="/Knowledge" element={<Knowledge />} />

            </Routes>
        </Router>
  );
}

export default App;
