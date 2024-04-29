// index.js
const express = require('express');
const app = express();
const cors = require ('cors')

const connection = require('./db/connection');
const createTables = require('./db/create_tables');

const router =require('./router/router')

app.use(cors())

app.use(express.json())

app.use(router)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
