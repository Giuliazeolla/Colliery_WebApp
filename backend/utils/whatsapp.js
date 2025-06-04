const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post('/send', async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: 'Numero o messaggio mancante' });
  }

  try {
    await client.messages.create({
      from: TWILIO_WHATSAPP_FROM,
      to: `whatsapp:+${to}`,
      body: message
    });
    console.log(`Messaggio WhatsApp inviato a ${to}`);
    res.sendStatus(200);
  } catch (err) {
    console.error('Errore invio WhatsApp:', err.message);
    res.status(500).json({ error: 'Errore invio messaggio WhatsApp' });
  }
});

module.exports = router;
