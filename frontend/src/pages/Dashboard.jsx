import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "../styles/navbar.css";

const Dashboard = () => {
  const [ordini, setOrdini] = useState([]);
  const [ruolo, setRuolo] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [pagina, setPagina] = useState(1);
  const [pagineTotali, setPagineTotali] = useState(1);
  const [filtroStato, setFiltroStato] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }

    const fetchDatiUtenteEOrdini = async () => {
      try {
        setLoading(true);

        // 1. Recupero dati utente (compreso il ruolo)
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const ruoloUtente = res.data.ruolo;
        setRuolo(ruoloUtente);

        // 2. Recupero ordini in base al ruolo
        const endpoint =
          ruoloUtente === "admin"
            ? `/api/orders?page=${pagina}&limit=5`
            : "/api/orders/miei";
        const ordiniRes = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrdini(ordiniRes.data.risultati || ordiniRes.data);
        if (ruoloUtente === "admin") {
          setPagineTotali(ordiniRes.data.pagineTotali);
        }
      } catch (err) {
        console.error("Errore recupero dati utente o ordini:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDatiUtenteEOrdini();
  }, [token, navigate, pagina]);

  const aggiornaStato = async (id, nuovoStato) => {
    try {
      await axios.put(
        `/api/orders/${id}/stato`,
        { stato: nuovoStato },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrdini((prev) =>
        prev.map((ordine) =>
          ordine._id === id ? { ...ordine, stato: nuovoStato } : ordine
        )
      );
    } catch (err) {
      console.error("Errore aggiornamento stato:", err);
    }
  };

  const ordiniFiltrati = ordini.filter(
    (o) => !filtroStato || o.stato === filtroStato
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="container">
        <Navbar />
      </div>
      <div className="title fade-in">
        <h1 style={{ paddingTop: "50px" }}>
          Dashboard {ruolo === "admin" ? "Admin" : "Cliente"}
        </h1>

        {ruolo === "admin" && (
          <select
            value={filtroStato}
            onChange={(e) => setFiltroStato(e.target.value)}
          >
            <option value="">Tutti gli stati</option>
            <option value="in attesa">In attesa</option>
            <option value="accettato">Accettato</option>
            <option value="rifiutato">Rifiutato</option>
          </select>
        )}

        {loading ? (
          <p>Caricamento ordini...</p>
        ) : ordiniFiltrati.length === 0 ? (
          <p>Nessun ordine disponibile.</p>
        ) : (
          <div>
            {ordiniFiltrati.map((ordine) => (
              <div key={ordine._id}>
                <p>
                  <strong>Ordine ID:</strong> {ordine._id}
                </p>
                <p>
                  <strong>Stato:</strong> {ordine.stato}
                </p>

                {ruolo === "admin" && (
                  <select
                    value={ordine.stato}
                    onChange={(e) => aggiornaStato(ordine._id, e.target.value)}
                  >
                    <option value="in attesa">In attesa</option>
                    <option value="accettato">Accettato</option>
                    <option value="rifiutato">Rifiutato</option>
                  </select>
                )}

                <details>
                  <summary>Dettagli ordine</summary>
                  <pre>{JSON.stringify(ordine.dettagli, null, 2)}</pre>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>

      {ruolo === "admin" && pagineTotali > 1 && (
        <div>
          <button
            onClick={() => setPagina((p) => Math.max(p - 1, 1))}
            disabled={pagina === 1}
          >
            ←
          </button>
          <span>
            Pagina {pagina} di {pagineTotali}
          </span>
          <button
            onClick={() => setPagina((p) => Math.min(p + 1, pagineTotali))}
            disabled={pagina === pagineTotali}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
