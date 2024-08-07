require('dotenv').config();

module.exports = {
  cors: {
    origin: '*', // Ajustez selon vos besoins
  },
  userServiceUrl: process.env.USER_SERVICE_URL || 'http://localhost:4001',
  options: {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Ajoutez des options au besoin
      return proxyReqOpts;
    },
  },
};
