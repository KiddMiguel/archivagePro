require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const fileRoutes = require('./routes/fileRoutes');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const validateApiKey = require('./middlewares/validateApiKey');
const morgan = require('morgan');
const { startAuthConsumer } = require('./events/authConsumer');
const app = express();

connectDB()
  .then(() => {
    startAuthConsumer().catch((err) => {
      console.error('Error starting auth consumer:', err);
    });

    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
  });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(helmet());
app.use(validateApiKey);
app.use(morgan('combined'));


app.use('/', fileRoutes);

const port = process.env.PORT || 4003;
app.listen(port, () => {
  console.log(`User Service running on port ${port}`);
});
