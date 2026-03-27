require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send(`<h1>Server is up and running</h1> <p>API is Active</p>`);
})


module.exports = app;