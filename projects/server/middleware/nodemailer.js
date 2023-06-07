const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "baskararw10@gmail.com",
    pass: "egrncbcovyrmbsqn",
  },
});

module.exports = transporter;
