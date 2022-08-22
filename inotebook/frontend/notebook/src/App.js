import './App.css';
import React, { useState} from 'react'
import { Home } from './components/Home';
import { About } from './components/About';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NoteState from './context/notes/NoteState';
import { Note } from './components/Note';
import Login from './components/Login';
import Signup from './components/Signup';
// import {Alert} from './components/Alert';

function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type
    })
    setInterval(() => {
      setAlert(null)
    }, 2500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/notes" element={<Note />} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
