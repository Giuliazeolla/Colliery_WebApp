import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "../../styles/forms.css";
import axios from "axios";

import Navbar from "../Navbar";
import "../../styles/navbar.css";

function CustomerInfoForm() {
  const navigate = useNavigate();
  const utente = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    ragioneSociale: "",
    sedeLegale: "",
    città: "",
    cap: "",
    provincia: "",
    telefono: "",
    fax: "",
    email: "",
    pec: "",
    partitaIva: "",
    codiceFiscale: "",
    sdi: "",
    sitoInternet: "",
    refAmministrativo: "",
    emailRefAmministrativo: "",
    cellulareRefAmministrativo: "",
    refCommerciale: "",
    emailRefCommerciale: "",
    cellulareRefCommerciale: "",
    ivaAgevolata: false,
    data: "",
    timbroFirma: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dati inviati:", formData);
    const dataISO = new Date(formData.data).toISOString();

    try {
      const response = await axios.post("/api/form/submit", {
        ...formData,
        data: dataISO,
        userId: utente?.id,
      });

      console.log(response.data.message);
      navigate("/riepilogo-ordine");
    } catch (error) {
      console.error("Errore durante l'invio del form:", error);
    }
  };

  const renderInput = (label, name, type = "text") => (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="form-input"
        value={formData[name]}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <div>
      <div className="container">
        <Navbar />
      </div>
      <div className="title fade-in" style={{ 'marginTop': '80px' }}>
        <h1>Scheda Anagrafica Cliente</h1>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        {renderInput("Ragione Sociale", "ragioneSociale")}
        {renderInput("Sede Legale", "sedeLegale")}
        {renderInput("Città", "città")}
        {renderInput("CAP", "cap")}
        {renderInput("Provincia", "provincia")}
        {renderInput("Telefono", "telefono", "tel")}
        {renderInput("Fax", "fax", "tel")}
        {renderInput("Email", "email", "email")}
        {renderInput("PEC", "pec", "email")}
        {renderInput("Partita IVA", "partitaIva")}
        {renderInput("Codice Fiscale", "codiceFiscale")}
        {renderInput("SDI", "sdi")}
        {renderInput("Sito Internet", "sitoInternet", "url")}
        {renderInput("Referente Amministrativo", "refAmministrativo")}
        {renderInput("Email Ref. Amm.", "emailRefAmministrativo", "email")}
        {renderInput(
          "Cellulare Ref. Amm.",
          "cellulareRefAmministrativo",
          "tel"
        )}
        {renderInput("Referente Commerciale", "refCommerciale")}
        {renderInput("Email Ref. Comm.", "emailRefCommerciale", "email")}
        {renderInput("Cellulare Ref. Comm.", "cellulareRefCommerciale", "tel")}
        <div className="form-group">
          <label className="form-label">
            <input
              type="checkbox"
              name="ivaAgevolata"
              checked={formData.ivaAgevolata}
              onChange={handleChange}
            />{" "}
            IVA Agevolata
          </label>
        </div>
        {renderInput("Data", "data", "date")}
        {renderInput("Timbro e Firma", "timbroFirma")}
        <button type="submit" className="form-submit">
          Invia
        </button>
      </form>
    </div>
  );
}

export default CustomerInfoForm;
