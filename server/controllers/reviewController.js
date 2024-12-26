const catchAsync = require("../utils/catchAsync");
const Review = require('../models/reviewModel');

exports.createReview = catchAsync(async (req, res) => {
    const newReview = await Review.create(req.body);

    res.status(201).json({
        status: "success",
        data: newReview
    });
});

exports.getReview = catchAsync(async (req, res) => {
    const review = await Review.findById({ _id: req.params.id });

    res.status(200).json({
        status: "success",
        data: review
    });
});

exports.getReviews = catchAsync(async (req, res) => {
    const reviews = await Review.find();

    res.status(200).json({
        status: "success",
        data: reviews
    });
});

exports.deleteReview = catchAsync(async (req, res) => {
    await Review.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: "success"
    });
});