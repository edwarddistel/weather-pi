const axios = require('axios');

// Query the Open Weather API
// eslint-disable-next-line
async function queryOpenWeather(keys) {
  if (keys) {
    const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${keys.latitude}&lon=${keys.longitude}&appid=${keys.apiKey}&units=${keys.units}`;
    try {
      const apiRes = await axios.get(requestUrl);
      if (apiRes && apiRes.status === 200 && apiRes.data) {
        return apiRes.data;
      }
      console.error('Problem with the response from the Open Weather API', apiRes);
      process.exit(1);
    } catch (err) {
      console.error('Error making a request to the Open Weather API', requestUrl, err.response.data);
      process.exit(1);
    }
  } else {
    console.error("Didn't pass coordinates and API key to query function.");
    process.exit(1);
  }
}

exports.queryOpenWeather = queryOpenWeather;
