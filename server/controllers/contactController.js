const catchAsync = require('../utils/catchAsync');
const Contact = require('../models/contactModel');

exports.createContact = catchAsync(async (req, res) => {
    const contact = await Contact.create(req.body);

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
