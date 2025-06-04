import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import "../styles/navbar.css";
import Chatbot from "./Chatbot";
import "../styles/chatbot.css";

import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Font Awesome
import { MdOutlineMail } from "react-icons/md";

import "../styles/home.css";
import logo from "../assets/img/enermetal.png";
import fotovoltaico from "../assets/img/fotovoltaico.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container">
        <Navbar />
      </div>
      <div className="title fade-in">
        <header>
          <h1>Benvenuto in Enermetal</h1>
          <p>Soluzioni fotovoltaiche su misura.</p>
          <img className="navbar-img" src={fotovoltaico} alt="Fotovoltaico" />
        </header>
        <div className="f-container">
          <footer className="footer">
            <p>
              &copy; {new Date().getFullYear()} Enermetal - Tutti i diritti
              riservati
            </p>
            <div className="footer-links">
              <a href="mailto:info@enermetal.it">
                <span className="margin">
                  <MdOutlineMail className="email" />
                </span>
                info@enermetal.it
              </a>
              <a href="tel:+390123456789">
                <span>
                  <FaPhone className="phone" />
                </span>
                +39 0123 456789
              </a>
            </div>
          </footer>
        </div>
        <Chatbot />
      </div>
    </div>
  );
};

export default Home;
