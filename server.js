const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./mongoose/mongoose');
const errorHandlerMiddleware = require('./core/middleware/error-handler');

const routes = require('./services/routes');
const authRoutes = require('./core/authentication/routes');

const app = express();

const defaultPort = process.env.PORT || 8080;

// json bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '512mb' }));

app.get('/test', (req, res) => {
    res.send({ message: 'test' });
});

app.use('/auth', authRoutes);
app.use('/api', routes);

// middleware
app.use(errorHandlerMiddleware());

app.listen(defaultPort, async () => {
    console.log(`Navigate to http://localhost:${defaultPort} to use the application`);
});

module.exports = app;