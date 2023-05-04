// server to query API
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', routes.getProductByID);

// listen on port from .env
const port = 3000;
app.listen(port);
console.log(`Listening at http://localhost:${port}`);
