const cors = require('cors');
const config = require('../config');
const { origin, methods, allowedHeaders, exposedHeaders, credentials, maxAge } = config.cors;

const corsOptions = {
    origin,
    methods,
    allowedHeaders,
    exposedHeaders,
    credentials,
    maxAge
};
module.exports = cors(corsOptions);