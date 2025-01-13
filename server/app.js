const express = require('express');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');
const contactRoute = require('./routes/contactRoute');
const reviewRoute = require('./routes/reviewRoute');
const mediaRoute = require('./routes/mediaRoute');
const signatureRoute = require('./routes/signatureRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use(mongoSanitize()); // mongoSanitize returns a middleware fn. This middleware look at the body, the request query string and also Request.params and then it will filter out all of the '$' signs and '.'

// Data sanitization
app.use(xss()); // imagine that an attacker would try to insert some malicious HTML code with some JavaScript code attached to it. If that would then later be injected into our HTML site, it could really create some damage then. Using this middleware we prevent that by converting all these HTML symbols



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

