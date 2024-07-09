const express = require('express');
const httpProxy = require('express-http-proxy');
const config = require('../config');

const router = express.Router();

router.use(httpProxy(config.userServiceUrl, config.options));

module.exports = router;