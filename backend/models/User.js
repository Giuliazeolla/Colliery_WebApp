const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { type: String },
  cognome: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telefono: { type: String },
  ruolo: {
    type: String,
    enum: ['cliente', 'admin'],
    default: 'cliente'
  },
  creatoIl: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);