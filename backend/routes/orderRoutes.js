// routes/orders.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const User = require('../models/User');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const transporter = require('../utils/email');
const client = require('../utils/whatsapp');

// ✅ Crea un nuovo ordine (utente autenticato + validazione)
router.post(
  '/orders',
  authenticateToken,
  [
    body('dettagli').notEmpty().withMessage("I dettagli dell'ordine sono obbligatori"),
    body('dettagli').isObject().withMessage('I dettagli devono essere un oggetto valido'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errori: errors.array() });

    try {
      const { dettagli } = req.body;

      const newOrder = new Order({
        utente: req.user.id,
        dettagli,
      });

      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (err) {
      console.error('Errore creazione ordine:', err);
      res.status(500).json({ error: "Errore nella creazione dell'ordine" });
    }
  }
);

// ✅ Ottieni tutti gli ordini (admin) con paginazione
router.get('/orders', authenticateToken, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totale = await Order.countDocuments();
    const orders = await Order.find()
      .populate('utente', 'email nome cognome')
      .skip(skip)
      .limit(limit)
      .sort({ creatoIl: -1 });

    res.json({
      totale,
      pagina: page,
      pagineTotali: Math.ceil(totale / limit),
      risultati: orders,
    });
  } catch (err) {
    console.error('Errore recupero ordini admin:', err);
    res.status(500).json({ error: 'Errore nel recuperare gli ordini' });
  }
});

// ✅ Ottieni ordini dell’utente loggato
router.get('/orders/miei', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ utente: req.user.id });
    res.json(orders);
  } catch (err) {
    console.error('Errore recupero ordini utente:', err);
    res.status(500).json({ error: 'Errore nel recuperare i tuoi ordini' });
  }
});

// ✅ Aggiorna stato ordine (solo admin)
router.put('/orders/:id/stato', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { stato } = req.body;
    if (!stato) return res.status(400).json({ error: 'Stato mancante' });

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Ordine non trovato' });

    order.stato = stato;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error('Errore aggiornamento stato:', err);
    res.status(500).json({ error: "Errore durante l'aggiornamento dello stato" });
  }
});

// ✅ Conferma ordine (notifiche automatiche) - solo admin
router.put('/orders/:id/conferma', authenticateToken, isAdmin, async (req, res) => {
  try {
    const ordine = await Order.findById(req.params.id).populate('utente');
    if (!ordine) return res.status(404).json({ error: 'Ordine non trovato' });

    ordine.stato = 'in attesa';
    await ordine.save();

    // ✅ Email al cliente
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: ordine.utente.email,
      subject: 'Conferma ordine Colliery',
      text: `Ciao ${ordine.utente.nome}, il tuo ordine è stato confermato ed è ora in attesa di approvazione.\n\nGrazie per averci scelto!`,
    });

    // ✅ Email all’azienda
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'giuliazeolla23@gmail.com',
      subject: 'Nuovo ordine da confermare',
      text: `Hai ricevuto un nuovo ordine da:\n${ordine.utente.nome} ${ordine.utente.cognome}\nEmail: ${ordine.utente.email}\n\nID ordine: ${ordine._id}`,
    });

    // ✅ WhatsApp al titolare
    await client.messages.create({
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+393248294717',
      body: `📦 Nuovo ordine da confermare:\nCliente: ${ordine.utente.nome} ${ordine.utente.cognome}\nEmail: ${ordine.utente.email}\nID ordine: ${ordine._id}`,
    });

    res.json({ message: 'Ordine confermato e notifiche inviate.' });
  } catch (err) {
    console.error('Errore conferma ordine:', err);
    res.status(500).json({ error: 'Errore durante la conferma ordine' });
  }
});

module.exports = router;
