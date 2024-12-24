const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');

router.post('/create-contact', contactController.createContact);

module.exports = router;