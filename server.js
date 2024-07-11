// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const User = require('./models/User');

// Define routes here...

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server.js
const cron = require('node-cron');
const getWeatherData = require('./utils/weather');
const sendWeatherReport = require('./utils/email');

cron.schedule('0 */3 * * *', async () => {
  const users = await User.find();
  users.forEach(async user => {
    const weatherData = await getWeatherData(user.location.city, user.location.country);
    await sendWeatherReport(user.email, weatherData);
  });
});

