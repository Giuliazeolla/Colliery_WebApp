const Form = require('../models/Form'); // oppure Order.js se usi lo stesso modello
const nodemailer = require('nodemailer');
// const twilio = require('twilio'); // da configurare in futuro

// Controller per invio e salvataggio del form
const submitForm = async (req, res) => {
  try {
    const formData = req.body;

    // Salvataggio nel database
    const newForm = new Form(formData);
    await newForm.save();

    // Log di debug
    console.log('Dati ricevuti dal form:', formData);

    // (FACOLTATIVO) Setup per invio email, es. con nodemailer
    const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS
       }
    });

     const mailOptions = {
       from: process.env.EMAIL_USER,
      to: 'commerciale@colliery.it', // oppure dynamic via formData.email
       subject: 'Nuovo invio form Colliery',
       text: JSON.stringify(formData, null, 2)
     };

     await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Form inviato e salvato con successo.' });

  } catch (err) {
    console.error('Errore durante l\'invio/salvataggio del form:', err);
    res.status(500).json({ message: 'Errore durante l\'invio del form.' });
  }
};

module.exports = { submitForm };


