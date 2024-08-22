require('dotenv').config();

module.exports = {
    cors: {
        origin: function (origin, callback) {
            const allowedOrigins = [process.env.CORS_ORIGIN, process.env.USER_SERVICE_URL];
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'), false);
            }
        },
        methods: process.env.CORS_METHODS || 'GET,PUT,POST,DELETE',
        allowedHeaders: process.env.CORS_ALLOWED_HEADERS || 'Content-Type,Authorization',
        exposedHeaders: process.env.CORS_EXPOSED_HEADERS || 'Content-Range,X-Content-Range,Content-Disposition', 
        credentials: process.env.CORS_CREDENTIALS || true,
        maxAge: process.env.CORS_MAX_AGE || 3600
    }
};
