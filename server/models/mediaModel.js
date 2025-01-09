const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
    {
        imgUrls: {
            type: [String],
            required: true,
        },
        videoUrls: {
            type: [String],
            required: true,
        },
        photographer: {
            type: String,
            required: true,
        },
        eventName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


const Media = mongoose.model('Media', mediaSchema);
module.exports = Media;
