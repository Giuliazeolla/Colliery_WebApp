const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Non autorizzato' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Permesso negato' });
    }
    next();
  };
};

module.exports = authorizeRoles;
