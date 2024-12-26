const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Contact = require('../models/contactModel');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASS
    }
});

const sendEmail = async (options) => {
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};


exports.createContact = catchAsync(async (req, res, next) => {
    const contact = await Contact.create(req.body);

    const { name, email, phone, weddingDate, message } = req.body;

    const adminNotificationMessage = `New User Contact Alert\n\nUser Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Date: ${weddingDate}\n\nMessage from the User:\n${message}\n\nPlease follow up with the user promptly to ensure a great experience.\n\nBest regards,\nWedding Photography Website Notification System`;

    try {
        await sendEmail({
            email: process.env.RECIPIENT_EMAIL, // recipient email
            subject: 'Photography Booking Request ',
            message: adminNotificationMessage,
        });

    } catch (err) {
        return next(new AppError('Booking successful but email could not be sent. Please conatct with the given phone number', 500));
    }

    res.status(200).json({
        status: "success",
        data: req.body
    });
});

exports.getContact = catchAsync(async (req, res) => {
    const contact = await Contact.find({ _id: req.params.id });

    res.status(200).json({
        status: "success",
        data: contact
    });
});

exports.getContacts = catchAsync(async (req, res) => {
    const contacts = await Contact.find();

    res.status(200).json({
        status: "success",
        results: contacts.length,
        data: contacts
    });
});

exports.deleteContact = catchAsync(async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: "success"
    });
});
