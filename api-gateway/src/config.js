require('dotenv').config();

module.exports = {
  cors: {
    origin: function (origin, callback) {
        const allowedOrigins = [process.env.CORS_ORIGIN, process.env.USER_SERVICE_URL, process.env.BILLING_SERVICE_URL, process.env.FILE_SERVICE_URL, process.env.FRONT_URL];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'), false);
        }
      },
    methods: process.env.CORS_METHODS || 'GET,PUT,POST,DELETE',
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS || 'Content-Type,Authorization',
    exposedHeaders: process.env.CORS_EXPOSED_HEADERS || 'Content-Range,Content-Disposition,X-Content-Range',
  },
  userServiceUrl: process.env.USER_SERVICE_URL || 'http://localhost:4001',
  billingServiceUrl: process.env.BILLING_SERVICE_URL || 'http://localhost:4002',
  fileServiceUrl: process.env.FILE_SERVICE_URL || 'http://localhost:4003',
  options: {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      return proxyReqOpts;
    },
    proxyReqBodyDecorator: (bodyContent) => {
      return bodyContent;
    },
    limit: '50mb',  // Limite de taille pour le corps de la requête
  },
};
