const express = require('express');
const axios = require('axios');

require('dotenv').config();
const { API_KEY } = process.env;

const serverApp = express();
const port = process.env.PORT || 5000;

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
serverApp.listen(port, () => {
    console.log(`listening on ${port}`);
});