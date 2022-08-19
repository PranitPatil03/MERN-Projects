import './App.css';
import { Home } from './components/Home';
import { About } from './components/About';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NoteState from './context/notes/NoteState';
import { Note } from './components/Note';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/notes" element={<Note />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
