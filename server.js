const express = require('express');

const app = express();

const defaultPort = process.env.PORT || 8080;

app.get('/hello', (req, res) => {
    res.send('hello world');
});

app.listen(defaultPort, async () => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`Navigate to http://localhost:${defaultPort} to use the application`);
    }
});

module.exports = app;