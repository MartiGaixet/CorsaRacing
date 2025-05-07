import React from "react";
import Header from '../components/header'
import Porsche from '../assets/porschePortada.avif'


function Home() {
  return (
    <div className="homeBody">
        <Header></Header>
        <div className="d-flex align-items-center justify-content-center">
            <h1 className="titleHome">CORSA RACING</h1>
        </div>
        <img src={Porsche} alt="Porsche" className="porscheHeader"></img>
        <div className="d-flex align-items-center justify-content-center">
          <p className="homeSubtitle">THE BEST RACING PLATFORM</p>
        </div>
    </div>
    
  );
}

export default Home


