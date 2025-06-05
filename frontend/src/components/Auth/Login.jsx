import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { loginUser } from "../../utils/auth";
import '../../styles/login.css';

function   Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        dispatch(setUser({
          id: result.id,
          email: result.email,
          token: result.token,
        }));
       navigate('/home'); 
       // Dopo una corretta autenticazione
localStorage.setItem("token", result.token); // Salva il token nel localStorage

      } else {
        setError(result.message || "Credenziali non valide");
      }
    } catch (err) {
      console.error("Errore login:", err);
      setError("Errore di connessione al server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Accesso Enermetal</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Accesso in corso..." : "Accedi"}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
