const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Controlla se l'utente esiste già
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Utente già registrato' });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea nuovo utente
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'Registrazione avvenuta con successo' });
  } catch (error) {
    console.error('Errore durante la registrazione:', error);
    return res.status(500).json({ message: 'Errore durante la registrazione' });
  }
};

exports.login = async (req, res) => {
  try {
    console.log('BODY LOGIN:', req.body);
    const { email, password } = req.body;

    // Trova utente per email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email non trovata' });
    }

    // Controlla password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password errata' });
    }

    // Genera token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Risposta con token e email
    return res.json({ token, email: user.email });
  } catch (error) {
    console.error('Errore durante il login:', error);
    return res.status(500).json({ message: 'Errore durante il login' });
  }
};