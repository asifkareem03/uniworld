// db/connection.js
const mysql = require('mysql2');

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test_schema'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

// Export the connection
module.exports = connection;
