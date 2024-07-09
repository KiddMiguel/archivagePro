require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const validateApiKey = require('./middlewares/validateApiKey');
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors()); 
app.use(validateApiKey);
app.use(morgan('combined'));

// Routes principales
app.use('/', userRoutes);

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`User Service running on port ${port}`);
});
