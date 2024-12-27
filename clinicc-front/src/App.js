import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
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
            </Routes>
        </Router>
  );
}

export default App;
