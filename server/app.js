const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');

const contactRoute = require('./routes/contactRoute');

app.use(cors()); // Use CORS middleware
app.use(express.json());

app.use('/api/contacts', contactRoute);

//the routes that are not handled by the above routes.
app.all('*', (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    } else {
        next(new AppError('Resource not found.', 404));
    }
});

app.use(globalErrorController);

module.exports = app;

