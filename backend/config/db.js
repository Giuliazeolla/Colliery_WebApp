const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri || !uri.startsWith("mongodb+srv://")) {
    throw new Error("URI MongoDB non valido. Controlla il file .env");
  }

  try {
    const conn = await mongoose.connect(uri); // Nessuna opzione necessaria con Mongoose 6+
    console.log(`MongoDB connesso: ${conn.connection.host}`);
  } catch (err) {
    console.error("Errore connessione MongoDB:", err.message);
    process.exit(1); // Termina il processo se fallisce
  }
};

module.exports = connectDB;