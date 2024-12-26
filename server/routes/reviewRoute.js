const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


//review routes
router.post('/create-review', reviewController.createReview);
router.get('/get-reviews', reviewController.getReviews);
router.get('/get-review', reviewController.getReview);
router.delete('/delete-review/:id', reviewController.deleteReview);

module.exports = router;
