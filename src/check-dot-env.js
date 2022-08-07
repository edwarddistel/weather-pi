require('dotenv').config();

// Check if .env file values are present and valid
function getDotEnv() {
  let err = false;
  let errMsg = '';

  const vals = {
    apiKey: process.env.OPEN_WEATHER_API_KEY,
    latitude: process.env.OPEN_WEATHER_API_LATITUDE,
    longitude: process.env.OPEN_WEATHER_API_LONGITUDE,
    units: process.env.OPEN_WEATHER_API_UNITS,
  };

  if (
    !vals.apiKey
		|| vals.apiKey === ''
		|| vals.apiKey === 'ENTER_YOUR_KEY_HERE'
  ) {
    err = true;
    errMsg = `Error with your Open Weather API Key (${vals.apiKey}) in your .env file, it should be something like "j28oba227tpfyk0mljshtlvng9oteq95w".`;
  }

  if (
    !vals.latitude
		|| !Number.isFinite(parseFloat(vals.latitude, 10))
		|| !vals.longitude
		|| !Number.isFinite(parseFloat(vals.longitude, 10))
  ) {
    err = true;
    errMsg = `Error with the latitude or longitude in your .env file (lat: ${vals.latitude}, ${vals.longitude}). Should be something like 40, -74.`;
  }

  if (err) {
    console.error(errMsg);
    process.exit(1);
  }

  return vals;
}

exports.getDotEnv = getDotEnv;
