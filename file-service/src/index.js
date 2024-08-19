require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/fileRoutes');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const validateApiKey = require('./middlewares/validateApiKey');
const { startAuthConsumer } = require('./events/authConsumer');
const app = express();
connectDB()
  .then(() => {
    startAuthConsumer().catch((err) => {
      console.error("Error starting auth consumer:", err);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });

app.use(helmet());
app.use(bodyParser.json());
app.use(cors()); 
app.use(validateApiKey);
app.use(morgan('combined'));

// Routes principales
app.use('/', fileRoutes);

const port = process.env.PORT || 4003;
app.listen(port, () => {
  console.log(`User Service running on port ${port}`);
});
