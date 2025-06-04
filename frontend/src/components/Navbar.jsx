import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

import logo from "../assets/img/enermetal.png";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex">
      <nav className="navbar">
        <img src={logo} className="nav-logo" />
        <ul className="nav-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
             <Link to="/scheda-anagrafica">Scheda Anagrafica</Link>
          </li>
          {user && (
            <li>
              <Link to="/richiesta-preventivo">Richiesta Preventivo</Link>
            </li>
          )}
          <li>
            <Link to="/storia">Storia</Link>
          </li>
          <li>
            <Link to="/lavori">I nostri lavori</Link>
          </li>
          <li>
            <Link to="/contatti">Contatti</Link>
          </li>
          {user && (
            <li>
              <Link to="/dashboard">I tuoi Ordini</Link>
            </li>
          )}
        </ul>

        <div className="auth-section">
          {user ? (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-button">
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
