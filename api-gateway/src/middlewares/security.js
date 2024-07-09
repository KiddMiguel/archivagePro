const helmet = require('helmet');

function secureTraffic(req, res, next) {
    // Ajouter la clé API ou le token JWT dans l'en-tête des requêtes sortantes
    req.headers['api-key'] = process.env.API_SECRET_KEY;
    next();
  }
  
  module.exports = [helmet(), secureTraffic];