import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';
import logo from'../assets/img/enermetal.png';

function LandingPage() {
  return (
    <div className="land-background">
      <img src={logo} alt="Logo Enermetal" className='logo logo-animate' />
      <div className='landing-header p-animate'>
      <h1>Benvenuto in Enermetal</h1>
      <p>La tua soluzione per il fotovoltaico sostenibile.</p>
      </div>
      <div className='button-container button-animate'>
        <Link
          to="/login"
          className="landing-button"
        >
          Accedi
        </Link>
        <Link
          to="/register"
          className="landing-button"
        >
          Registrati
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
