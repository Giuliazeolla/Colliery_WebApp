const mongoose = require("mongoose");

const formModel1Schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  ragioneSociale: { type: String, trim: true },
  sedeLegale: { type: String, trim: true },
  città: { type: String, trim: true },
  cap: { type: String, trim: true },
  provincia: { type: String, trim: true },
  telefono: { type: String, trim: true },
  fax: { type: String, trim: true },
  email: { type: String, trim: true },
  pec: { type: String, trim: true },
  partitaIva: { type: String, trim: true },
  codiceFiscale: { type: String, trim: true },
  sdi: { type: String, trim: true },
  sitoInternet: { type: String, trim: true },

  refAmministrativo: { type: String, trim: true },
  emailRefAmministrativo: { type: String, trim: true },
  cellulareRefAmministrativo: { type: String, trim: true },
  refCommerciale: { type: String, trim: true },
  emailRefCommerciale: { type: String, trim: true },
  cellulareRefCommerciale: { type: String, trim: true },

  ivaAgevolata: { type: Boolean, default: false },
  data: { type: Date },
  timbroFirma: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model("FormModel1", formModel1Schema);
