const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validazione base
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e password sono obbligatorie' });
    }

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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e password sono obbligatorie' });
    }

    // Trova utente per email
    const user = await User.findOne({ email });
    if (!user) {
      // Non specificare se email o password errati per sicurezza
      return res.status(400).json({ message: 'Credenziali non valide' });
    }

    // Controlla password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenziali non valide' });
    }

    // Genera token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.json({ token, email: user.email });
  } catch (error) {
    console.error('Errore durante il login:', error);
    return res.status(500).json({ message: 'Errore durante il login' });
  }
};
