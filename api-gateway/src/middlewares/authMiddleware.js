// Ce middleware va vérifier les tokens d'authentification.
const axios = require('axios');
const config = require('../config');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({ message: 'Access Denied' });
  }

  try {
    const response = await axios.post(`${config.authServiceUrl}/verify-token`, { token });
    req.user = response.data.user;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid Token' });
  }
};
