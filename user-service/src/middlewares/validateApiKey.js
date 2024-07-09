const validateApiKey = async (req, res, next) => {
    const apiKey = req.headers['api-key'];
    const secretKey = process.env.API_SECRET_KEY;
    if (!apiKey || apiKey !== secretKey) {
        return res.status(403).send('Access Denied: Invalid API Key');
    }
    next();
};

module.exports = validateApiKey;


