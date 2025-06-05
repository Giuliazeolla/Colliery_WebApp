const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/authMiddleware");
const formController1 = require("../controllers/formController1");

// POST salva o aggiorna form1 (utente deve essere autenticato)
router.post("/submit", authenticateToken, formController1.upsertFormModel1);

// GET dati form1 per utente loggato (senza specificare userId nel path)
router.get("/load", authenticateToken, formController1.getFormModel1ByUser);

module.exports = router;
