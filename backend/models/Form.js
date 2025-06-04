const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Scheda Anagrafica Cliente
  ragioneSociale: String,
  sedeLegale: String,
  citta: String,
  cap: String,
  provincia: String,
  telefono: String,
  fax: String,
  email: String,
  pec: String,
  partitaIva: String,
  codiceFiscale: String,
  sdi: String,
  sitoInternet: String,
  refAmministrativo: {
    nome: String,
    email: String,
    cellulare: String
  },
  refCommerciale: {
    nome: String,
    email: String,
    cellulare: String
  },
  ivaAgevolata10: Boolean,
  dataCompilazione: Date,
  timbroFirma: String, // Può essere una stringa o base64 (firma digitale)

  // Richiesta Preventivo
  tipoStruttura: { type: String, enum: ['Struttura standard', 'Struttura Agrivoltaico'] },
  richiesteAggiuntive: {
    recinzione: Boolean,
    pullOutTest: Boolean,
    sistemaMonitoraggio: Boolean,
    infissionePali: Boolean
  },

  // Dati Generali
  nomeProgetto: String,
  coordinateProgetto: {
    latitudine: String,
    longitudine: String
  },
  localitaComune: String,
  provinciaProgetto: String,
  referente: String,
  contatti: {
    email: String,
    telefono: String
  },

  // Tipologia Struttura (una sola scelta)
  tipologiaStruttura: { type: String, enum: ['fissa', 'pensilina', 'tracker'] },
  depositoSismico: { type: String, enum: ['si', 'no'] },

  specificheTecniche: {
    tiltGradi: Number,
    nrModuliStringa: Number,
    altezzaMinimaMt: Number,
    nrModuliComplessivi: Number,
    potenzaModuloWp: Number
  },

  // Agrivoltaico (mostrato solo se Struttura Agrivoltaico)
  agrivoltaico: {
    distanzaPaliMt: Number,
    distanzaFileMt: Number,
    note: String
  },

  // Agrivoltaico monitoraggio avanzato (solo se selezionato)
  agrivoltaicoMonitoraggio: {
    nrStazioniMonitoraggio: Number,
    sensoriRichiesti: {
      anemometro: Boolean,
      barometro: Boolean,
      pluviometro: Boolean,
      radiazioneSolare: Boolean,
      sensoreEC: Boolean,
      termoIgnometro: Boolean
    }
  },

  // Tipologia Servizi

  pullOutTestDettagli: {  // se pull-out test selezionato
    tipologiaPalo: String,
    numPali: Number,
    lunghezzaPaloMt: Number,
    profonditaInfissioneMt: Number
  },

  infissionePaliDettagli: {  // se infissione pali selezionato
    tipologiaPalo: String,
    numPali: Number,
    lunghezzaPaloMt: Number,
    profonditaInfissioneMt: Number
  },

  noteCriticita: String,

  // Documenti da allegare (checkbox e potenzialmente upload files)
  documentiAllegati: {
    relazioneGeologica: Boolean,
    schedaTecnicaModulo: Boolean,
    layoutImpiantoDwg: Boolean,
    rilievoCurveLivello: Boolean
  },
  // qui potresti aggiungere campi per i file upload, es. url o path file

  dataFirma: Date,
  consensoPrivacy: { type: Boolean, required: true }
},
{
  timestamps: true
});

module.exports = mongoose.model('Form', formSchema);