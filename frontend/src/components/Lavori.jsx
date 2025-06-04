import React from "react";
import "../styles/project.css";
import residenziale from "../assets/img/residenziale.png";
import sicilia from "../assets/img/sicilia.png";
import integrale from "../assets/img/integrale.png";

import Navbar from "./Navbar";
import "../styles/navbar.css";

const Lavori = () => {
  return (
    <div>
      <div className="container">
        <Navbar />
      </div>
      <div className="projects-page fade-in" style={{ 'marginTop': '70px' }}>
        <h2>I nostri Lavori</h2>
        <ul className="project-list">
          <div className="project-card">
            <li>Impianto fotovoltaico residenziale - Trento</li>
            <img src={residenziale} alt="residenziale" />
          </div>
          <div className="project-card">
            <li>Installazione industriale - Sicilia</li>
            <img src={sicilia} alt="sicilia" />
          </div>
          <div className="project-card">
            <li>Soluzioni integrate - Calabria</li>
            <img src={integrale} alt="integrale" />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Lavori;
