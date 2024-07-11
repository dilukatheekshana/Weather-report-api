// utils/weather.js
const axios = require('axios');

const getWeatherData = async (city, country) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
  const response = await axios.get(url);
  const { temp } = response.data.main;
  const { description } = response.data.weather[0];
  return { temperature: temp, description };
};

module.exports = getWeatherData;
