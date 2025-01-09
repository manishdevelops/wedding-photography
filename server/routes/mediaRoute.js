const express = require('express');
const router = express.Router();

const mediaController = require('../controllers/mediaController');

router.post('/upload', mediaController.upload);

router.get('/get-media', mediaController.getMedia);

module.exports = router;