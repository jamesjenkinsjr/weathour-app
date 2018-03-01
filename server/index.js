const express = require('express');
const axios = require('axios');

require('dotenv').config();
const { API_KEY, GOOG_MAP_KEY } = process.env;

const serverApp = express();
const port = process.env.PORT || 5000;

//middleware
serverApp.use(express.static('client/build'));

serverApp.get('/geocode/json?address=${zip}', function(request, response) {
    const {zip} = request.params;
    const url = `http://maps.googleapis.com/maps/api/geocode/json?address=${zip}&${GOOG_MAP_KEY}`;
    axios
        .get(url)
        .then(res => {
            response.status(200).json(res.data);
        })
        .catch(err => {
            response.status(500).json({
                msg: "No google maps for you"
            });
        });
});

serverApp.get('/forecast/:lat,:long', function(request, response) {
    const {lat, long} = request.params;
    const url = `https://api.darksky.net/forecast/${API_KEY}/${lat},${long}`;
    axios
        .get(url)
        .then(res => {
            response.status(200).json(res.data);
        })
        .catch(err => {
            response.status(500).json({
                msg: 'Your shizzle is not drizzlin'
            });
        });
});

//server the app

serverApp.get('*', (request, response) => {
    response.sendFile('index.html', {root: path.resolve('client/build')});
});
serverApp.listen(port, () => {
    console.log(`listening on ${port}`);
});