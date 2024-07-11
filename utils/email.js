// utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendWeatherReport = async (email, weatherData) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Hourly Weather Report',
    text: `Weather update: ${weatherData.temperature}°C, ${weatherData.description}`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendWeatherReport;
