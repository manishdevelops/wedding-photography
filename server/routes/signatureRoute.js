const express = require('express');
const router = express.Router();

const signatureController = require('../controllers/signatureController');

router.post('/generate-signature', signatureController.generateSignature);

module.exports = router;