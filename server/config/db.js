const mysql = require('mysql');
const config = require('config');

const db = mysql.createConnection({
  host: config.get('mysqlHost'),
  user: config.get('mysqlUser'),
  password: config.get('mysqlPassword'),
  database: config.get('mysqlDatabase')
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

module.exports = db;