const express = require("express");
const router = express.Router();
const FormModel2 = require("../models/formModel2");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// POST salva o aggiorna form2
router.post("/submit", authenticateToken, async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ message: "Utente non autenticato" });

    const userId = req.user.id.toString();
    const data = req.body;

    const existing = await FormModel2.findOne({ userId });

    if (existing) {
      await FormModel2.updateOne({ userId }, data);
      return res.json({ message: "Form2 aggiornato con successo" });
    } else {
      const newForm = new FormModel2({ ...data, userId });
      await newForm.save();
      return res.status(201).json({ message: "Form2 creato con successo" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore server" });
  }
});

// GET dati form2 per userId
router.get("/:userId", authenticateToken, async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ message: "Utente non autenticato" });

    if (req.user.id.toString() !== req.params.userId.toString()) return res.sendStatus(403);

    const info = await FormModel2.findOne({ userId: req.params.userId.toString() });
    if (!info) return res.status(404).json({ message: "Dati form2 non trovati" });

    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore server" });
  }
});

module.exports = router;
