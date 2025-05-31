const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware per autenticare il token JWT
const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Accesso negato. Nessun token fornito.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ad esempio: { id: utente._id }
    next();
  } catch (err) {
    console.error('Errore verifica token:', err);
    return res.status(401).json({ error: 'Token non valido.' });
  }
};

// Middleware per verificare se l'utente è admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Accesso negato. Privilegi amministrativi richiesti.' });
    }
    next();
  } catch (err) {
    console.error('Errore controllo admin:', err);
    return res.status(500).json({ error: 'Errore del server durante la verifica dei privilegi.' });
  }
};

module.exports = { authenticateToken, isAdmin };
