require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
const nodemailer = require("../middleware/nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const env = process.env;

module.exports = {
  register: async (req, res) => {
    const { email, first_name, last_name, gender } = req.body;
    const fullName = `${first_name} ${last_name}`;

    let getEmailQuery = `SELECT * FROM users WHERE email=${db.escape(email)}`;
    let isEmailExist = await query(getEmailQuery);
    if (isEmailExist.length > 0) {
      return res.status(400).send({ message: "Email has been used" });
    }

    const generateOTP = () => {
      const otpLength = 6;
      const min = Math.pow(10, otpLength - 1);
      const max = Math.pow(10, otpLength) - 1;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const otp = generateOTP();

    let addUserQuery = `INSERT INTO users VALUES (null, ${db.escape(
      email
    )}, ${db.escape(first_name)}, ${db.escape(last_name)}, ${db.escape(
      gender
    )}, null,null,false, ${otp}, null)`;
    let addUserResult = await query(addUserQuery);

    let mail = {
      from: `Admin <baskararw10@gmail.com>`,
      to: `${email}`,
      subject: `Verify your account`,
      html: `
      <div>
        <p>Thanks for registering, ${fullName}! Please verify your account by entering the OTP below:</p>
        <h2>${otp}</h2>
      </div>
      `,
    };

    let response = await nodemailer.sendMail(mail);
    console.log(response);

    return res
      .status(200)
      .send({ data: addUserResult, message: "Register success" });
  },
};
