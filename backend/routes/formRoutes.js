const express = require('express');
const router = express.Router();
const { submitForm } = require('../controllers/formController');

// Rotta per ricevere i dati del form
router.post('/submit', submitForm);

module.exports = router;