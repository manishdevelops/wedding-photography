const express = require('express');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');
const contactRoute = require('./routes/contactRoute');
const reviewRoute = require('./routes/reviewRoute');
const mediaRoute = require('./routes/mediaRoute');
const signatureRoute = require('./routes/signatureRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/media', mediaRoute);
app.use('/api/signature', signatureRoute);

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

