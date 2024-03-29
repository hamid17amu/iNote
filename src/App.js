import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About'
import NoteState from './context/Notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Changepass from './components/Changepass';
import Profile from './components/Profile'
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null)


  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },3000)
  }


  return (
    <>
    <NoteState>
      <Router>
        <Navbar showAlert={showAlert}/>
        <Alert text={alert}/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
          <Route exact path="/changepass" element={<Changepass showAlert={showAlert}/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
        
        </Routes>
        </div>
      </Router>
      
      </NoteState>
    </>
  );
}

export default App;
