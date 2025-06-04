const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
app.set('trust proxy', 1); // Fai in modo che Express si fidi del proxy


// Middleware rate limit: max 100 richieste per IP ogni 15 minuti
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 100,
  message: 'Troppe richieste dallo stesso IP. Riprova più tardi.',
});
app.use(limiter);

// Altri middleware
app.use(cors());
app.use(express.json());

// Rotte
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Connessione a MongoDB e avvio server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connesso a MongoDB');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server avviato sulla porta ${PORT}`);
  });
})
.catch((err) => {
  console.error('Errore connessione MongoDB:', err);
});
