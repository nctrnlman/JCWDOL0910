const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rhazesnote@gmail.com",
    pass: "sthejwtmcleszlgd",
  },
});

module.exports = transporter;
