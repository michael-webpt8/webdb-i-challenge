const express = require('express');
const db = require('./data/dbConfig.js');
const accountsRouter = require('./routes/accountsRoute');

const server = express();
server.use(express.json());

server.use('/accounts', accountsRouter);

server.use((req, res) => {
  res.status(404).json({ message: '404 missing route.' });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'An error occurred.' });
});

module.exports = server;
