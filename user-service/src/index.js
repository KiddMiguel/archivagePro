require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { startConsumer } = require('./events/consumer');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const validateApiKey = require('./middlewares/validateApiKey');
const app = express();
connectDB()
  .then(() => {
    startConsumer().catch((err) => {
      console.error('Error starting auth consumer:', err);
    });

    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
  });
  
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
  startConsumer().catch(console.error); 
});
