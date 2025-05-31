const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ error: 'Email, oggetto o messaggio mancanti' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message
    });
    console.log(`Email inviata a ${to}`);
    res.sendStatus(200);
  } catch (err) {
    console.error('Errore invio email:', err.message);
    res.status(500).json({ error: 'Errore invio email' });
  }
});

module.exports = router;
