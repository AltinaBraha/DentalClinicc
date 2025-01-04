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
import EditMedicalRecord from './Pages/UpdateModals/EditMedicalRecord';
import EditPrescription from './Pages/UpdateModals/EditPrescription';
import DentistProfile from './Pages/DentistProfile';

import FrontPage from './Pages/Dashboard/GlobalFiles/FrontPage';
import Terminet from './Pages/Dashboard/GlobalFiles/Terminet';
import Admin from './Pages/Dashboard/GlobalFiles/Admin';
import Dentist from './Pages/Dashboard/GlobalFiles/Dentist';
import Rating from './Pages/Dashboard/GlobalFiles/Rating';
import Complaint from './Pages/Dashboard/GlobalFiles/Complaint';
import Contacts from './Pages/Dashboard/GlobalFiles/Contact';
import AddAppointment from './Pages/Dashboard/Create/Add_Appointment';
import EditPatient from './Pages/Dashboard/Update/EditPatient';
import EditAppointment from './Pages/Dashboard/Update/EditAppointment';
import EditAdmin from './Pages/Dashboard/Update/EditAdmin';



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
              <Route path="/Patients" element={<Patients />} />
              <Route path="/Knowledge" element={<Knowledge />} />
              <Route path="/EditMedicalRecordPatient/:id" element={<EditMedicalRecord />} />
              <Route path="/EditPrescriptionPatient/:id" element={<EditPrescription />} />
              <Route path="/dashboard" element={<FrontPage />} />
              <Route path="/terminet" element={<Terminet />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/Dentist" element={<Dentist />} />
              <Route path="/Rating" element={<Rating />} />
              <Route path="/Complaint" element={<Complaint />} />
              <Route path="/Contacts" element={<Contacts />} />
              <Route path="/Add_Termini" element={<AddAppointment />} />
              <Route path="EditPatient/:id" element={<EditPatient />} />
              <Route path="EditAppointment/:id" element={<EditAppointment />} />
              <Route path="EditAdmin/:id" element={<EditAdmin />} />
              <Route path="/DentistProfile" element={<DentistProfile />} />


            </Routes>
        </Router>
  );
}

export default App;
