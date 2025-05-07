import '../src/styles/App.css';
import Home from '../src/pages/home'
import Championships from '../src/pages/championships'
import Races from '../src/pages/races'
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/campeonatos" element={<Championships />} />
        <Route path="/carreras" element={<Races />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
