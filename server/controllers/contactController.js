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

// const verifyCaptcha = async (recaptcha) => {
//     const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${recaptcha}`, {
//         method: 'POST'
//     });
//     const data = await response.json();
//     if (!data.success) {
//         throw new AppError('Captcha verification failed. Please try again.', 400);
//     }
// };

exports.createContact = catchAsync(async (req, res, next) => {
    const { name, email, phone, weddingDate, message } = req.body;

    // await verifyCaptcha(recaptcha);

    const contact = await Contact.create({
        name, email, phone, weddingDate, message
    });

    const adminNotificationMessage = `New User Contact Alert\n\nUser Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Date: ${weddingDate}\n\nMessage from the User:\n${message}\n\nPlease follow up with the user promptly to ensure a great experience.\n\nBest regards,\nWedding Photography Website Notification System`;

    try {
        await sendEmail({
            email: process.env.RECIPIENT_EMAIL, // recipient email
            subject: 'Photography Booking Request ',
            message: adminNotificationMessage,
        });

    } catch (err) {
        return next(new AppError('Booking successful but email could not be sent. Please contact with the given phone number', 500));
    }

    res.status(201).json({
        status: "success",
        data: contact
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
