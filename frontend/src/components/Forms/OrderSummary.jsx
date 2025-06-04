import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../../styles/forms.css";

import Navbar from "../Navbar";
import "../../styles/navbar.css";

export default function OrderSummary({ formData, opzionali, onReset }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const utente = useSelector((state) => state.user.user);

  function formatLabel(label) {
    return label
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const payload = {
      ...formData,
      refAmministrativo: {
        nome: formData.refAmministrativo,
        email: formData.emailRefAmministrativo,
        cellulare: formData.cellulareRefAmministrativo,
      },
      refCommerciale: {
        nome: formData.refCommerciale,
        email: formData.emailRefCommerciale,
        cellulare: formData.cellulareRefCommerciale,
      },
      dataCompilazione: formData.data,
      opzionali,
      userId: utente?._id || null,
    };

    try {
      await axios.post("/api/send-email", {
        to: formData.emailRefAmministrativo,
        subject: "Conferma Ordine Enermetal",
        message: "Abbiamo ricevuto il tuo ordine. Ti contatteremo a breve.",
      });

      await axios.post("/api/send-email", {
        to: "commerciale@colliery.it",
        subject: "Nuovo Ordine da Confermare",
        message: `Ordine da confermare per ${formData.ragioneSociale}.\n\nDati:\n${JSON.stringify(payload, null, 2)}`,
      });

      await axios.post("/api/send-whatsapp", {
        to: "39XXXXXXXXXX",
        message: `🔔 Nuovo ordine da ${formData.ragioneSociale}. Confermare o disdire su Enermetal.`,
      });

      setSuccessMsg("Ordine inviato con successo!");
      onReset();
    } catch (err) {
      console.error("Errore durante l'invio:", err);
      setError("Errore durante l'invio dell'ordine. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="order-summary">
      <Navbar />
      <h2 className="title">Riepilogo Ordine</h2>

      <div className="section">
        <h3>Dati Cliente</h3>
        <ul>
          {Object.entries(formData)
            .filter(
              ([key]) =>
                ![
                  "emailRefAmministrativo",
                  "cellulareRefAmministrativo",
                  "emailRefCommerciale",
                  "cellulareRefCommerciale",
                ].includes(key)
            )
            .map(([key, value]) => (
              <li key={key}>
                <strong>{formatLabel(key)}:</strong>{" "}
                {typeof value === "boolean" ? (value ? "Sì" : "No") : String(value)}
              </li>
            ))}
        </ul>
      </div>

      <div className="section">
        <h3>Referente Amministrativo</h3>
        <ul>
          <li><strong>Nome:</strong> {formData.refAmministrativo}</li>
          <li><strong>Email:</strong> {formData.emailRefAmministrativo}</li>
          <li><strong>Cellulare:</strong> {formData.cellulareRefAmministrativo}</li>
        </ul>
      </div>

      <div className="section">
        <h3>Referente Commerciale</h3>
        <ul>
          <li><strong>Nome:</strong> {formData.refCommerciale}</li>
          <li><strong>Email:</strong> {formData.emailRefCommerciale}</li>
          <li><strong>Cellulare:</strong> {formData.cellulareRefCommerciale}</li>
        </ul>
      </div>

      <div className="section">
        <h3>Opzionali</h3>
        <ul>
          {Object.entries(opzionali).map(([key, value]) => (
            <li key={key}>
              <strong>{formatLabel(key)}:</strong>{" "}
              {typeof value === "boolean" ? (value ? "Sì" : "No") : String(value)}
            </li>
          ))}
        </ul>
      </div>

      {error && <p className="error">{error}</p>}
      {successMsg && <p className="success">{successMsg}</p>}

      <button
        disabled={loading}
        onClick={handleSubmit}
        className={`submit-btn ${loading ? "disabled" : ""}`}
      >
        {loading ? "Invio in corso..." : "Conferma e Invia"}
      </button>
    </div>
  );
}
