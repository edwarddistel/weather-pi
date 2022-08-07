const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const { getDotEnv } = require('./check-dot-env');
const { queryOpenWeather } = require('./get-weather-data');

const EXPRESS_PORT = 3000;

// To avoid hitting 1K rate limit, remember last API request
let lastFetchAttempt = 'STARTUP';
let lastFetchResponse;

// API key, coordinates
const keys = getDotEnv();

// Root route hits Open Weather API
app.get('/', async (req, res) => {
  if (lastFetchAttempt === 'STARTUP' || +new Date() - lastFetchAttempt > 1440 * 1000) {
    const apiRes = await queryOpenWeather(keys);
    lastFetchAttempt = +new Date();
    lastFetchResponse = apiRes;
    res.status(200).send(apiRes);
  } else {
    res.status(200).send(lastFetchResponse);
    console.log('15 minute wait period not expired, sent previous fetch data');
  }
});

app.listen(EXPRESS_PORT);
console.log(`App listening on port ${EXPRESS_PORT}`);
