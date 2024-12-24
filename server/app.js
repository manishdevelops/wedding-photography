const express = require('express');
const app = express();

const contactRoute = require('./routes/contactRoute');

app.use(express.json());

app.use('/api/contacts', contactRoute);


module.exports = app;

