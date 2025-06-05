const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Header Authorization ricevuto:", authHeader);

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.error("Errore verifica token:", error.message);
      return res.status(401).json({ message: "Token non valido o scaduto" });
    }
  } else {
    return res.status(401).json({ message: "Non autorizzato, token mancante" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.ruolo === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Accesso negato. Non sei admin." });
  }
};

module.exports = { authenticateToken, isAdmin };
