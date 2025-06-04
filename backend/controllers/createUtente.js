require('dotenv').config(); // Carica variabili da .env
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definisci lo schema User
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

async function creaUtente() {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error('Variabile MONGO_URI mancante nel file .env');

    // Connessione al DB
    await mongoose.connect(MONGO_URI);

    const email = 'giuliazeolla23@gmail.com';
    const passwordChiara = '12345'; // Modifica la password a piacere
    const hash = await bcrypt.hash(passwordChiara, 10);

    // Verifica se utente esiste
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('L\'utente esiste già.');
    } else {
      // Crea nuovo utente
      const user = new User({ email, password: hash });
      await user.save();
      console.log('Utente creato con successo.');
    }
  } catch (err) {
    console.error('Errore durante la creazione utente:', err.message);
  } finally {
    // Disconnetti sempre
    await mongoose.disconnect();
  }
}

creaUtente();