import React from "react";
import "../styles/contacts.css";

import Navbar from "./Navbar";
import "../styles/navbar.css";
import "../styles/global.css";

import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const Contatti = () => {
  return (
    <div>
      <div className="container">
      <Navbar />
      </div>
      <div className="contacts-page">
        <h2 className="contact-title">Contattaci</h2>
        <p className="contact-description">
          Siamo a tua disposizione per informazioni, preventivi o supporto
          tecnico. Compila il modulo o contattaci tramite i riferimenti qui
          sotto.
        </p>

        <div className="contact">
          <div className="contact-card">
            <div className="contact-item">
              <span className="contact-icon">
                {" "}
                <MdOutlineMail className="email-" />
              </span>
              <p>
                Email: <a href="mailto:info@colliery.it">info@colliery.it</a>
              </p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-item">
              <span className="contact-icon">
                <FaPhone className="phone-" />
              </span>
              <p>
                Telefono: <a href="tel:+39123456789">123-456789</a>
              </p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-item">
              <span className="contact-icon">
                <FaMapMarkerAlt className="pos" />
              </span>
              <p>Indirizzo: Via Esempio 10, Milano (MI)</p>
            </div>
          </div>

          <div className="contact-hours">
            <h4>Orari di apertura</h4>
            <p>Lun - Ven: 09:00 - 18:00</p>
            <p>Sabato: 09:00 - 13:00</p>
            <p>Domenica: Chiuso</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contatti;
