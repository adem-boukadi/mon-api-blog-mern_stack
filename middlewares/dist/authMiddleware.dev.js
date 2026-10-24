"use strict";

var jwt = require('jsonwebtoken');

var User = require('../models/userModel');

var protect = function protect(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function protect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
            _context.next = 17;
            break;
          }

          _context.prev = 1;
          token = req.headers.authorization.split(' ')[1];
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findById(decoded.id).select('-password'));

        case 6:
          req.user = _context.sent;

          if (req.user) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Non autorisé, utilisateur introuvable'
          }));

        case 9:
          return _context.abrupt("return", next());

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);

          if (!(_context.t0.name === 'TokenExpiredError')) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: "Votre session a expire, veuillez vous reconnecter"
          }));

        case 16:
          return _context.abrupt("return", res.status(401).json({
            message: 'Non autorisé, token invalide'
          }));

        case 17:
          if (token) {
            _context.next = 19;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Non autorisé, aucun token fourni'
          }));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

var adminOnly = function adminOnly(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  return res.status(403).json({
    message: 'Accès refusé : droits administrateur requis'
  });
};

module.exports = {
  protect: protect,
  adminOnly: adminOnly
};
//# sourceMappingURL=authMiddleware.dev.js.map
