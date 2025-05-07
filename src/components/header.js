import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/CRLogo.png";
import Casco from "../assets/cascoPerfil.png";
import { useNavigate } from "react-router-dom";
import ProfileWidget from "../components/profileWidget"

const Header = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-4 mb-4">
        <a onClick={() => navigate("/Home")} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <img src={Logo} className="bi me-2" width="50" height="auto" alt="Logo" />
        </a>

        <ul className="nav nav-pills">
          <li className="nav-item nav-link" onClick={() => navigate("/campeonatos")}>Championships</li>
          <li className="nav-item nav-link" onClick={() => navigate("/carreras")}>Races</li>
          <li className="nav-item nav-link" onClick={() => setShowProfile(true)}>
            <img src={Casco} width="40" height="auto" alt="Casco Perfil" />
          </li>
        </ul>
      </header>

      {/* Widget de perfil */}
      <ProfileWidget show={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  );
};

export default Header;
