const mongoose = require('mongoose');

const AllegatoSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
  mimetype: String,
  size: Number
});

const FormSchema = new mongoose.Schema({
  // Dati cliente
  ragioneSociale: String,
  nomeProgetto: String,
  localitaComune: String,          // aggiornato da localita a localitaComune
  provincia: String,
  emailContatto: String,           // aggiornato da email a emailContatto
  telefonoContatto: String,        // aggiornato da telefono a telefonoContatto

  // Disposizione moduli
  disposizioneModuli: String,
  disposizioneModuliAltro: String,

  // Specifiche tecniche generali
  tiltGradi: Number,
  nrModuliPerStringa: Number,
  altezzaMinima: Number,
  nrModuliComplessivi: Number,
  potenzaModulo: Number,

  // Scelte form
  struttura: String,
  tipologiaStruttura: String,
  depositoSismico: String,

  coordinate: String,
  note: String,

  // Opzionali
  richiesteAggiuntive: {
    recinzione: Boolean,
    pullOutTest: Boolean,
    agrivoltaicoMonitoraggio: Boolean,
    infissionePali: Boolean
  },

  // Agrivoltaico
  distPali: Number,
  distFile: Number,
  noteAgrivoltaico: String,

  // Agrivoltaico monitoraggio avanzato
  nrStazioniMonitoraggio: Number,
  sensoriRichiesti: [String],
  altroSensore: String,

  // Infissione pali
  tipoPaloInfissione: String,
  numPaliInfissione: Number,
  lunghezzaPaloInfissione: Number,
  profonditaInfissione: Number,

  // Pull-out test
  tipoPaloPullOut: String,
  numPaliPullOut: Number,
  lunghezzaPaloPullOut: Number,
  profonditaPullOut: Number,

  // Upload & firma
  allegati: [AllegatoSchema],
  consenso: Boolean,
  dataFirma: Date,
  firma: String,

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }

}, { timestamps: true });

module.exports = mongoose.model('Form', FormSchema);
