const express = require('express');
const router = express.Router();
const httpProxy = require('express-http-proxy');
const proxySettings = require('../config');

router.use(httpProxy(proxySettings.fileServiceUrl, proxySettings.options));

module.exports = router;