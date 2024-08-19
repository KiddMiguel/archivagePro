require('dotenv').config();

module.exports = {
  cors: {
    origin: '*', // Ajustez selon vos besoins
  },
  userServiceUrl: process.env.USER_SERVICE_URL || 'http://localhost:4001',
  billingServiceUrl: process.env.BILLING_SERVICE_URL || 'http://localhost:4002',
  fileServiceUrl: process.env.FILE_SERVICE_URL || 'http://localhost:4003',
  options: {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Ajoutez des options au besoin
      return proxyReqOpts;
    },
  },
};
