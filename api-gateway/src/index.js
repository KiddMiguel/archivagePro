require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const security = require('./middlewares/security');
const config = require('./config');

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('combined'));
app.use(cors(config.cors));

// Security
app.use(security);

// Routes
const userRoutes = require('./routes/userRoutes');
const billingRoutes = require('./routes/billingRoutes');
app.use('/users', userRoutes);
app.use('/billings', billingRoutes);

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
