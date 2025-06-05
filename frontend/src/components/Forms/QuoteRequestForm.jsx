import React, { useState } from "react";
import Navbar from "../Navbar";

export default function QuoteRequestForm({ utente }) {
  const [formData, setFormData] = useState({
    ragioneSociale: "",
    nomeProgetto: "",
    localitaComune: "",
    provincia: "",
    emailContatto: "",
    telefonoContatto: "",
    disposizioneModuli: "",
    disposizioneModuliAltro: "",
    tiltGradi: "",
    nrModuliPerStringa: "",
    altezzaMinima: "",
    nrModuliComplessivi: "",
    potenzaModulo: "",
    struttura: "",
    opzionali: {
      recinzione: false,
      pullOutTest: false,
      agrivoltaicoMonitoraggio: false,
      infissionePali: false,
    },
    tipologiaStruttura: "",
    depositoSismico: "",
    coordinate: "",
    note: "",
    documenti: [],
    consenso: false,
    data: "",
    firma: "",

    // Agrivoltaico specifici
    distPali: "",
    distFile: "",
    noteAgrivoltaico: "",

    // Agrivoltaico monitoraggio avanzato
    nrStazioniMonitoraggio: "",
    sensoriRichiesti: {
      anemometro: false,
      radiazioneSolare: false,
      barometro: false,
      pluviometro: false,
      sensoreEC: false,
      termoIgnometro: false,
      altro: false,
    },
    altroSensore: "",

    // Infissione pali
    tipoPaloInfissione: "",
    numPaliInfissione: "",
    lunghezzaPaloInfissione: "",
    profonditaInfissione: "",

    // Pull-out test
    tipoPaloPullOut: "",
    numPaliPullOut: "",
    lunghezzaPaloPullOut: "",
    profonditaPullOut: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.opzionali) {
      setFormData((prev) => ({
        ...prev,
        opzionali: {
          ...prev.opzionali,
          [name]: type === "checkbox" ? checked : value,
        },
      }));
    } else if (name in formData.sensoriRichiesti) {
      setFormData((prev) => ({
        ...prev,
        sensoriRichiesti: {
          ...prev.sensoriRichiesti,
          [name]: type === "checkbox" ? checked : value,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      documenti: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();

    submissionData.append("ragioneSociale", formData.ragioneSociale);
    submissionData.append("nomeProgetto", formData.nomeProgetto);
    submissionData.append("localitaComune", formData.localitaComune);
    submissionData.append("provincia", formData.provincia);
    submissionData.append("emailContatto", formData.emailContatto);
    submissionData.append("telefonoContatto", formData.telefonoContatto);
    submissionData.append("disposizioneModuli", formData.disposizioneModuli);
    submissionData.append(
      "disposizioneModuliAltro",
      formData.disposizioneModuliAltro
    );
    submissionData.append("tiltGradi", formData.tiltGradi);
    submissionData.append("nrModuliPerStringa", formData.nrModuliPerStringa);
    submissionData.append("altezzaMinima", formData.altezzaMinima);
    submissionData.append("nrModuliComplessivi", formData.nrModuliComplessivi);
    submissionData.append("potenzaModulo", formData.potenzaModulo);
    submissionData.append("struttura", formData.struttura);

    submissionData.append("opzionali", JSON.stringify(formData.opzionali));

    submissionData.append("tipologiaStruttura", formData.tipologiaStruttura);
    submissionData.append("depositoSismico", formData.depositoSismico);
    submissionData.append("coordinate", formData.coordinate);
    submissionData.append("note", formData.note);
    submissionData.append("consenso", formData.consenso);
    submissionData.append("data", formData.data);
    submissionData.append("firma", formData.firma);

    if (formData.struttura === "agrivoltaico") {
      submissionData.append("distPali", formData.distPali);
      submissionData.append("distFile", formData.distFile);
      submissionData.append("noteAgrivoltaico", formData.noteAgrivoltaico);
    }

    if (formData.opzionali.agrivoltaicoMonitoraggio) {
      submissionData.append(
        "nrStazioniMonitoraggio",
        formData.nrStazioniMonitoraggio
      );
      submissionData.append(
        "sensoriRichiesti",
        JSON.stringify(formData.sensoriRichiesti)
      );
      submissionData.append("altroSensore", formData.altroSensore);
    }

    if (formData.opzionali.infissionePali) {
      submissionData.append("tipoPaloInfissione", formData.tipoPaloInfissione);
      submissionData.append("numPaliInfissione", formData.numPaliInfissione);
      submissionData.append(
        "lunghezzaPaloInfissione",
        formData.lunghezzaPaloInfissione
      );
      submissionData.append(
        "profonditaInfissione",
        formData.profonditaInfissione
      );
    }

    if (formData.opzionali.pullOutTest) {
      submissionData.append("tipoPaloPullOut", formData.tipoPaloPullOut);
      submissionData.append("numPaliPullOut", formData.numPaliPullOut);
      submissionData.append(
        "lunghezzaPaloPullOut",
        formData.lunghezzaPaloPullOut
      );
      submissionData.append("profonditaPullOut", formData.profonditaPullOut);
    }

    formData.documenti.forEach((file) => {
      submissionData.append("documenti", file);
    });

    if (utente && utente._id) {
      submissionData.append("userId", utente._id);
    }

    try {
      const response = await fetch("/api/form/submit-form", {
        method: "POST",
        body: submissionData,
      });

      if (!response.ok) throw new Error("Errore nel server");

      alert("Modulo inviato con successo");
      setFormData({
        ragioneSociale: "",
        nomeProgetto: "",
        localitaComune: "",
        provincia: "",
        emailContatto: "",
        telefonoContatto: "",
        disposizioneModuli: "",
        disposizioneModuliAltro: "",
        tiltGradi: "",
        nrModuliPerStringa: "",
        altezzaMinima: "",
        nrModuliComplessivi: "",
        potenzaModulo: "",
        struttura: "",
        opzionali: {
          recinzione: false,
          pullOutTest: false,
          agrivoltaicoMonitoraggio: false,
          infissionePali: false,
        },
        tipologiaStruttura: "",
        depositoSismico: "",
        coordinate: "",
        note: "",
        documenti: [],
        consenso: false,
        data: "",
        firma: "",

        distPali: "",
        distFile: "",
        noteAgrivoltaico: "",

        nrStazioniMonitoraggio: "",
        sensoriRichiesti: {
          anemometro: false,
          radiazioneSolare: false,
          barometro: false,
          pluviometro: false,
          sensoreEC: false,
          termoIgnometro: false,
          altro: false,
        },
        altroSensore: "",

        tipoPaloInfissione: "",
        numPaliInfissione: "",
        lunghezzaPaloInfissione: "",
        profonditaInfissione: "",

        tipoPaloPullOut: "",
        numPaliPullOut: "",
        lunghezzaPaloPullOut: "",
        profonditaPullOut: "",
      });
    } catch (error) {
      alert("Errore nell'invio del modulo, riprova.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <Navbar />
      </div>
      <div className="title">
        <form
          className="form-prv title"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2>Richiesta Preventivo</h2>

          <label>Ragione Sociale</label>
          <input
            type="text"
            name="ragioneSociale"
            value={formData.ragioneSociale}
            onChange={handleChange}
            required
            className="input-rc"
          />

          <label className="l">Nome Progetto</label>
          <input
            type="text"
            name="nomeProgetto"
            value={formData.nomeProgetto}
            onChange={handleChange}
            required
            className="input-rc"
          />

          <label className="l">Località Comune</label>
          <input
            type="text"
            name="localitaComune"
            value={formData.localitaComune}
            onChange={handleChange}
            required
            className="input-rc"
          />

          <label className="l">Provincia</label>
          <input
            type="text"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            required
            className="input-rc"
          />

          <label className="l">Email Contatto</label>
          <input
            type="email"
            name="emailContatto"
            value={formData.emailContatto}
            onChange={handleChange}
            required
            className="input-rc"
          />

          <label className="l">Telefono Contatto</label>
          <input
            type="tel"
            name="telefonoContatto"
            value={formData.telefonoContatto}
            onChange={handleChange}
            required
            className="input-rc"
          />

          <label className="l">Disposizione Moduli</label>
          <select
            name="disposizioneModuli"
            value={formData.disposizioneModuli}
            onChange={handleChange}
            required
            className="input-rc"
          >
            <option value="">-- Seleziona --</option>
            <option value="verticale">Verticale</option>
            <option value="orizzontale">Orizzontale</option>
            <option value="altro">Altro</option>
          </select>

          {formData.disposizioneModuli === "altro" && (
            <>
              <label className="l">Specifica Disposizione Altro</label>
              <input
                type="text"
                name="disposizioneModuliAltro"
                value={formData.disposizioneModuliAltro}
                onChange={handleChange}
                className="input-rc"
              />
            </>
          )}

          <label className="l">Tilt Gradi</label>
          <input
            type="number"
            name="tiltGradi"
            value={formData.tiltGradi}
            onChange={handleChange}
            min="0"
            max="90"
            required
            className="input-rc"
          />

          <label className="l">Nr Moduli per Stringa</label>
          <input
            type="number"
            name="nrModuliPerStringa"
            value={formData.nrModuliPerStringa}
            onChange={handleChange}
            min="1"
            required
            className="input-rc"
          />

          <label className="l">Altezza Minima (m)</label>
          <input
            type="number"
            name="altezzaMinima"
            value={formData.altezzaMinima}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="input-rc"
          />

          <label className="l">Nr Moduli Complessivi</label>
          <input
            type="number"
            name="nrModuliComplessivi"
            value={formData.nrModuliComplessivi}
            onChange={handleChange}
            min="1"
            required
            className="input-rc"
          />

          <label className="l">Potenza Modulo (W)</label>
          <input
            type="number"
            name="potenzaModulo"
            value={formData.potenzaModulo}
            onChange={handleChange}
            min="1"
            required
            className="input-rc"
          />

          <label className="l">Struttura</label>
          <select
            name="struttura"
            value={formData.struttura}
            onChange={handleChange}
            required
            className="input-rc"
          >
            <option value="">-- Seleziona --</option>
            <option value="tradizionale">Tradizionale</option>
            <option value="agrivoltaico">Agrivoltaico</option>
            <option value="tetto">Tetto</option>
          </select>

          <fieldset className="l">
            <legend>Opzionali</legend>
            <label>
              <input
                type="checkbox"
                name="recinzione"
                checked={formData.opzionali.recinzione}
                onChange={handleChange}
                className="input-rc"
              />
              Recinzione
            </label>

            <label>
              <input
                type="checkbox"
                name="pullOutTest"
                checked={formData.opzionali.pullOutTest}
                onChange={handleChange}
                className="input-rc"
              />
              Pull-Out Test
            </label>

            <label>
              <input
                type="checkbox"
                name="agrivoltaicoMonitoraggio"
                checked={formData.opzionali.agrivoltaicoMonitoraggio}
                onChange={handleChange}
                className="input-rc"
              />
              Agrivoltaico Monitoraggio
            </label>

            <label>
              <input
                type="checkbox"
                name="infissionePali"
                checked={formData.opzionali.infissionePali}
                onChange={handleChange}
                className="input-rc"
              />
              Infissione Pali
            </label>
          </fieldset>

          {formData.struttura === "agrivoltaico" && (
            <>
              <label>Distanza Pali (m)</label>
              <input
                type="number"
                name="distPali"
                value={formData.distPali}
                onChange={handleChange}
                min="0"
                className="input-rc"
              />

              <label>Distanza File (m)</label>
              <input
                type="number"
                name="distFile"
                value={formData.distFile}
                onChange={handleChange}
                min="0"
                className="input-rc"
              />

              <label>Note Agrivoltaico</label>
              <textarea
                name="noteAgrivoltaico"
                value={formData.noteAgrivoltaico}
                onChange={handleChange}
                className="input-rc"
              />
            </>
          )}

          {formData.opzionali.agrivoltaicoMonitoraggio && (
            <>
              <label>Numero Stazioni Monitoraggio</label>
              <input
                type="number"
                name="nrStazioniMonitoraggio"
                value={formData.nrStazioniMonitoraggio}
                onChange={handleChange}
                min="0"
                className="input-rc"
              />

              <fieldset>
                <legend>Sensori Richiesti</legend>
                {Object.entries(formData.sensoriRichiesti).map(
                  ([key, checked]) => (
                    <label key={key}>
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
                  )
                )}
              </fieldset>

              {formData.sensoriRichiesti.altro && (
                <>
                  <label>Specifica Altro Sensore</label>
                  <input
                    type="text"
                    name="altroSensore"
                    value={formData.altroSensore}
                    onChange={handleChange}
                    className="input-rc"
                  />
                </>
              )}
            </>
          )}

          {formData.opzionali.infissionePali && (
            <>
              <label>Tipo Palo Infissione</label>
              <input
                type="text"
                name="tipoPaloInfissione"
                value={formData.tipoPaloInfissione}
                onChange={handleChange}
                className="input-rc"
              />

              <label>Numero Pali Infissione</label>
              <input
                type="number"
                name="numPaliInfissione"
                value={formData.numPaliInfissione}
                onChange={handleChange}
                min="0"
                className="input-rc"
              />

              <label>Lunghezza Palo Infissione (m)</label>
              <input
                type="number"
                name="lunghezzaPaloInfissione"
                value={formData.lunghezzaPaloInfissione}
                onChange={handleChange}
                min="0"
                className="input-rc"
              />

              <label>Profondità Infissione (m)</label>
              <input
                type="number"
                name="profonditaInfissione"
                value={formData.profonditaInfissione}
                onChange={handleChange}
                min="0"
                className="input-rc"
              />
            </>
          )}

          {formData.opzionali.pullOutTest && (
            <>
              <label>Tipo Palo Pull-Out Test</label>
              <input
                type="text"
                name="tipoPaloPullOut"
                value={formData.tipoPaloPullOut}
                onChange={handleChange}
                className="input-rc"
              />

              <label>Numero Pali Pull-Out Test</label>
              <input
                type="number"
                name="numPaliPullOut"
                value={formData.numPaliPullOut}
                onChange={handleChange}
                min="0"
                className="input-rc"
              />

              <label>Lunghezza Palo Pull-Out Test (m)</label>
              <input
                type="number"
                name="lunghezzaPaloPullOut"
                value={formData.lunghezzaPaloPullOut}
                onChange={handleChange}
                min="0"
                className="input-rc"
              />

              <label>Profondità Pull-Out Test (m)</label>
              <input
                type="number"
                name="profonditaPullOut"
                value={formData.profonditaPullOut}
                onChange={handleChange}
                min="0"
                className="input-rc"
              />
            </>
          )}

          <label className="l">Tipologia Struttura</label>
          <input
            type="text"
            name="tipologiaStruttura"
            value={formData.tipologiaStruttura}
            onChange={handleChange}
            className="input-rc"
          />

          <label className="l">Deposito Sismico</label>
          <input
            type="text"
            name="depositoSismico"
            value={formData.depositoSismico}
            onChange={handleChange}
            className="input-rc"
          />

          <label className="l">Coordinate</label>
          <input
            type="text"
            name="coordinate"
            value={formData.coordinate}
            onChange={handleChange}
            className="input-rc"
          />

          <label className="l">Note</label>
          <textarea name="note" value={formData.note} onChange={handleChange} />

          <label className="l">Carica Documenti (pdf, immagini)</label>
          <input
            type="file"
            name="documenti"
            multiple
            onChange={handleFileChange}
            accept=".pdf,image/*"
          />

          <label className="l">
            <input
              type="checkbox"
              name="consenso"
              checked={formData.consenso}
              onChange={handleChange}
              required
              className="input-rc"
            />
            Acconsento al trattamento dei dati personali
          </label>

          <label className="l">Data</label>
          <input
            type="date"
            name="data"
            value={formData.data}
            onChange={handleChange}
            required
            className="input-rc"
          />

          <label className="l">Firma (nome completo)</label>
          <input
            type="text"
            name="firma"
            value={formData.firma}
            onChange={handleChange}
            required
            className="input-rc"
          />

          <button type="submit" className="button-rc">Invia Richiesta</button>
        </form>
      </div>
    </>
  );
}
