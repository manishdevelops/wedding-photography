const catchAsync = require("../utils/catchAsync");
const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');


// const verifyCaptcha = async (recaptcha) => {
//     const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${recaptcha}`, {
//         method: 'POST'
//     });
//     const data = await response.json();
//     if (!data.success) {
//         throw new AppError('Captcha verification failed. Please try again.', 400);
//     }
// };

exports.createReview = catchAsync(async (req, res) => {

    const { name, review } = req.body;

    // await verifyCaptcha(recaptcha);

    const newReview = await Review.create({ name, review });

    res.status(201).json({
        status: "success",
        data: newReview
    });
});

exports.getReview = catchAsync(async (req, res) => {
    const review = await Review.find({ _id: req.params.id });

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