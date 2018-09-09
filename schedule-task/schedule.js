
const express = require('express');


const app = express();

const defaultPort = process.env.PORT || 8088;


app.get('/worker', (req, res) => {
    res.send({ message: 'test Worker Service' });
});

app.listen(defaultPort, async () => {
    console.log(`Navigate to http://localhost:${defaultPort} to use the application`);
});

module.exports = app;