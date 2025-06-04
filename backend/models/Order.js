const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  utente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stato: {
    type: String,
    enum: ['non accettato', 'sospeso', 'rifiutato', 'accettato'],
    default: 'non accettato'
  },
  dettagli: {
    tipoImpianto: String,
    potenzaRichiesta: String,
    indirizzoInstallazione: String,
    noteCliente: String
  },
  creatoIl: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);