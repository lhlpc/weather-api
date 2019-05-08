// External Imports
const express = require('express');

// App Imports
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// -------- App -------
const app = express();
const port = process.env.PORT || 3000;



// API requests
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.listen(port, () => {
    console.log('Server is up on port' + port);
});