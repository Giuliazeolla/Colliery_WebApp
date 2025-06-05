import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchFormData = async () => {
      const token = localStorage.getItem("token");
      if (!token || !utente?.id) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/form1/${utente.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data) {
          const serverData = response.data;

          // Formatta la data per l'input date (yyyy-mm-dd)
          let formattedDate = "";
          if (serverData.data) {
            formattedDate = new Date(serverData.data).toISOString().substring(0, 10);
          }

          setFormData({
            ragioneSociale: serverData.ragioneSociale || "",
            sedeLegale: serverData.sedeLegale || "",
            città: serverData.città || "",
            cap: serverData.cap || "",
            provincia: serverData.provincia || "",
            telefono: serverData.telefono || "",
            fax: serverData.fax || "",
            email: serverData.email || "",
            pec: serverData.pec || "",
            partitaIva: serverData.partitaIva || "",
            codiceFiscale: serverData.codiceFiscale || "",
            sdi: serverData.sdi || "",
            sitoInternet: serverData.sitoInternet || "",
            refAmministrativo: serverData.refAmministrativo || "",
            emailRefAmministrativo: serverData.emailRefAmministrativo || "",
            cellulareRefAmministrativo: serverData.cellulareRefAmministrativo || "",
            refCommerciale: serverData.refCommerciale || "",
            emailRefCommerciale: serverData.emailRefCommerciale || "",
            cellulareRefCommerciale: serverData.cellulareRefCommerciale || "",
            ivaAgevolata: serverData.ivaAgevolata || false,
            data: formattedDate,
            timbroFirma: serverData.timbroFirma || "",
          });
        }
      } catch (error) {
        console.error("Errore nel recupero dati scheda anagrafica:", error);
      }
    };

    fetchFormData();
  }, [utente]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Token mancante, impossibile inviare richiesta autenticata.");
      return;
    }

    // Converte la data in ISO 8601, oppure null se vuota
    const dataISO = formData.data ? new Date(formData.data).toISOString() : null;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/form1/submit",
        { ...formData, data: dataISO },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response.data.message);
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
      <div className="fade-in">
        <div className="title" style={{ marginTop: "80px" }}>
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
          {renderInput("Cellulare Ref. Amm.", "cellulareRefAmministrativo", "tel")}
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
    </div>
  );
}

export default CustomerInfoForm;
