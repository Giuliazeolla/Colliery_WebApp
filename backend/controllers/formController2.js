const FormModel2 = require("../models/formModel2");

exports.upsertFormModel2 = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Utente non autenticato" });
    }

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
};

exports.getFormModel2ByUser = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Utente non autenticato" });
    }

    if (req.user.id.toString() !== req.params.userId.toString()) {
      return res.sendStatus(403);
    }

    const info = await FormModel2.findOne({ userId: req.params.userId });
    if (!info) {
      return res.status(404).json({ message: "Dati form2 non trovati" });
    }

    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore server" });
  }
};
