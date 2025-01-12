const Media = require('../models/mediaModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.upload = catchAsync(async (req, res, next) => {
    const { imgUrls, videoUrls, photographer, eventName } = req.body;

    if (!imgUrls || !videoUrls || !photographer || !eventName) {
        return next(new AppError("Missing required fields", 400));
    }

    const newMedia = await Media.create({
        imgUrls,
        videoUrls,
        photographer,
        eventName
    });

    res.status(201).json({
        status: 'success',
        data: {
            media: newMedia
        }
    });
});

exports.getMedia = catchAsync(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 2;
    const skip = (page - 1) * limit;

    // Fetch media sorted by newest to oldest
    const media = await Media.find()
        .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
        .skip(skip)
        .limit(limit);

    res.status(200).json({
        status: "success",
        results: media.length,
        data: media,
    });
});
