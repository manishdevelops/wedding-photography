const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    review: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
