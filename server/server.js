const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server started on port ${port}`));