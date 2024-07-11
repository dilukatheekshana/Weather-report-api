// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const axios = require('axios');

// Store user details
router.post('/users', async (req, res) => {
  const { email, location } = req.body;
  try {
    const user = new User({ email, location });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user location
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { location } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { location }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user weather data for a given day
router.get('/users/:id/weather', async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;
  try {
    const user = await User.findById(id);
    const weatherData = user.weatherData.filter(data => new Date(data.date).toDateString() === new Date(date).toDateString());
    res.json(weatherData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
