import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../../styles/forms.css";

import Navbar from "../Navbar";
import "../../styles/navbar.css";

export default function QuoteRequestForm() {
  const utente = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    struttura: "",
    opzionali: {
      recinzione: false,
      pullOutTest: false,
      monitoraggio: false,
      infissionePali: false,
    },
    tipologiaStruttura: "",
    depositoSismico: "",
    agrivoltaico: false,
    coordinate: "",
    note: "",
    documenti: [],
    consenso: false,
    data: "",
    firma: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.opzionali) {
      setFormData((prev) => ({
        ...prev,
        opzionali: {
          ...prev.opzionali,
          [name]: checked,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, documenti: Array.from(e.target.files) }));
  };

  const openGoogleEarth = () => {
    window.open(
      "https://earth.google.com/web/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consenso) {
      alert("Devi accettare il trattamento dei dati personali.");
      return;
    }

    const submissionData = new FormData();

    // Aggiungi i documenti (file)
    formData.documenti.forEach((file) => {
      submissionData.append("documenti", file);
    });

    // Aggiungi gli altri dati (serializza opzionali)
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "documenti") return; // già aggiunti

      if (typeof value === "object" && key !== "documenti" && value !== null) {
        submissionData.append(key, JSON.stringify(value));
      } else {
        submissionData.append(key, value);
      }
    });

    if (utente && utente.email) {
      submissionData.append("utenteEmail", utente.email);
    }

    try {
      await axios.post("/api/form/quote", submissionData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Modulo inviato con successo");
      // Reset form dopo invio
      setFormData({
        struttura: "",
        opzionali: {
          recinzione: false,
          pullOutTest: false,
          monitoraggio: false,
          infissionePali: false,
        },
        tipologiaStruttura: "",
        depositoSismico: "",
        agrivoltaico: false,
        coordinate: "",
        note: "",
        documenti: [],
        consenso: false,
        data: "",
        firma: "",
      });
    } catch (error) {
      console.error(error);
      alert("Errore durante l'invio del modulo");
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <Navbar />
      </div>
      <form onSubmit={handleSubmit} className="form-prv fade-in title">
        <h2>Richiesta Preventivo</h2>
        <div className="container-rc">
          <div>
            <label>Struttura:</label>
            <select
              name="struttura"
              value={formData.struttura}
              onChange={handleChange}
              required
              className="input-rc"
            >
              <option value="">Seleziona</option>
              <option value="standard">Struttura Standard</option>
              <option value="agrivoltaico">Struttura Agrivoltaico</option>
            </select>
          </div>

          <fieldset className="fieldset">
            <legend>Opzionali:</legend>
            {Object.entries(formData.opzionali).map(([key, checked]) => (
              <label key={key} className="label">
                <input
                  type="checkbox"
                  name={key}
                  checked={checked}
                  onChange={handleChange}
                  className="input-rc"
                />
                {key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1")}
              </label>
            ))}
          </fieldset>

          <fieldset className="fieldset">
            <legend>Tipologia Struttura:</legend>
            {["fissa", "pensilina", "tracker"].map((val) => (
              <label key={val} className="label">
                <input
                  type="radio"
                  name="tipologiaStruttura"
                  value={val}
                  checked={formData.tipologiaStruttura === val}
                  onChange={handleChange}
                  required
                  className="input-rc"
                />
                {val.charAt(0).toUpperCase() + val.slice(1)}
              </label>
            ))}
          </fieldset>

          <fieldset className="fieldset">
            <legend>Deposito sismico (DPR 380):</legend>
            {["si", "no"].map((val) => (
              <label key={val} className="label">
                <input
                  type="radio"
                  name="depositoSismico"
                  value={val}
                  checked={formData.depositoSismico === val}
                  onChange={handleChange}
                  required
                  className="input-rc"
                />
                {val === "si" ? "Sì" : "No"}
              </label>
            ))}
          </fieldset>

          <div>
            <label>Coordinate progetto (Google Earth):</label>
            <div>
              <input
                type="text"
                name="coordinate"
                value={formData.coordinate}
                onChange={handleChange}
                placeholder="Inserisci coordinate"
                required
                className="input-rc"
              />
              <button type="button" onClick={openGoogleEarth}>
                Apri Google Earth
              </button>
            </div>
          </div>

          <div>
            <label>Note e criticità:</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={3}
              placeholder="Eventuali note"
              className="input-rc"
            />
          </div>

          <div>
            <label>Documenti da allegare:</label>
            <input
              type="file"
              name="documenti"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.jpg,.png,.doc,.docx"
              className="input-rc"
            />
          </div>

          <div>
            <label>Data:</label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
              className="input-rc"
            />
          </div>

          <div>
            <label>Firma:</label>
            <input
              type="text"
              name="firma"
              value={formData.firma}
              onChange={handleChange}
              placeholder="Firma digitale o nome"
              required
              className="input-rc"
            />
          </div>

          <div>
            <input
              type="checkbox"
              name="consenso"
              checked={formData.consenso}
              onChange={handleChange}
              required
            />
            <label>
              Acconsento al trattamento dei dati personali sopra forniti
            </label>
          </div>
          <div className="div-button">
            <button
              className="button-rc"
              type="submit"
              disabled={!formData.consenso}
            >
              Invia modulo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
