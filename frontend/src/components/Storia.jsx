import React from 'react';
import '../styles/history.css';
import fissaggio from '../assets/img/fissaggio.png';

import Navbar from "./Navbar";
import "../styles/navbar.css";

const Storia = () => {
  return (
    <div>
      <div className="container">
      <Navbar />
      </div>
    <div className="history-page fade-in">
      <h2>La nostra Storia</h2>
    <img src={fissaggio} alt="Sistema di fissaggio" className="logo-h" />
      <p className="history-intro">
        Enermetal nasce dalla passione per l'energia pulita e dalla volontà di offrire soluzioni fotovoltaiche efficienti, durevoli e accessibili.
      </p>

      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-icon">🌱</div>
          <div className="timeline-content">
            <h4>2010 — Le origini</h4>
            <p>
              Nata dalla carpenteria metallica, Enermetal inizia la produzione di supporti per impianti fotovoltaici.
            </p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon">⚙️</div>
          <div className="timeline-content">
            <h4>2015 — L'espansione</h4>
            <p>
              Grazie all’innovazione, offre anche servizi di installazione e consulenza energetica.
            </p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon">🌞</div>
          <div className="timeline-content">
            <h4>2023 — Oggi</h4>
            <p>
              Azienda leader nel settore, progetta soluzioni fotovoltaiche su misura e sostenibili.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Storia;
