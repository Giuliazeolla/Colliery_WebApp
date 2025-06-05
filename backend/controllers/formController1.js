const FormModel1 = require("../models/formModel1");

exports.upsertFormModel1 = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Utente non autenticato" });
    }

    const userId = req.user.id.toString();
    const data = req.body;

    const existing = await FormModel1.findOne({ userId });

    if (existing) {
      await FormModel1.updateOne({ userId }, data);
      return res.json({ message: "Form1 aggiornato con successo" });
    } else {
      const newForm = new FormModel1({ ...data, userId });
      await newForm.save();
      return res.status(201).json({ message: "Form1 creato con successo" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore server" });
  }
};

exports.getFormModel1ByUser = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Utente non autenticato" });
    }

    if (req.user.id.toString() !== req.params.userId.toString()) {
      return res.status(403).json({ message: "Accesso negato" });
    }

    const info = await FormModel1.findOne({ userId: req.params.userId.toString() });
    if (!info) {
      return res.status(404).json({ message: "Dati form1 non trovati" });
    }

    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore server" });
  }
};
