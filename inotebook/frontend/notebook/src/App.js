import './App.css';
import { Home } from './components/Home';
import { About } from './components/About';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from  'react-router-dom'

function App() {
  return (
    <>
    <Navbar/>
    <Router>
    <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>
        </Routes>
    </Router>
    </>
  );
}

export default App;
