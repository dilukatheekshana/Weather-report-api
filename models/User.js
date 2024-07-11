const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  location: { 
    city: String, 
    country: String 
  },
  weatherData: [{
    date: { type: Date, default: Date.now },
    temperature: Number,
    description: String
  }]
});

module.exports = mongoose.model('User', userSchema);
