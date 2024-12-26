const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

//contact-us routes
router.post('/create-contact', contactController.createContact);
router.get('/get-contacts', contactController.getContacts);
router.get('/get-contact/:id', contactController.getContact);
router.delete('/delete-contact/:id', contactController.deleteContact);


module.exports = router;