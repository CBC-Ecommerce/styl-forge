// server to query API
require('dotenv').config();
const express = require("express");
const axios = require("axios");

// listne on port from .env
app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);