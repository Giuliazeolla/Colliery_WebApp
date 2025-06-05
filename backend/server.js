require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authController = require('./controllers/authController');

const formRoutes1 = require("./routes/formRoutes1");
const formRoutes2 = require('./routes/formRoutes2');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/form1", formRoutes1);
app.use(cors({
  origin: 'http://localhost:3000', // URL del tuo frontend
  credentials: true
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

// Usa i router formModel1Routes e formModel2Routes (i middleware di autenticazione sono già dentro i router)
app.use('/api/form1', formRoutes1);
app.use('/api/form2', formRoutes2);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
