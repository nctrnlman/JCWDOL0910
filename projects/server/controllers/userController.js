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
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const isEmailExist = await query(
        `SELECT * FROM users WHERE email=${db.escape(email)}`
      );
      if (isEmailExist.length == 0) {
        return res
          .status(200)
          .send({ message: "Email or Password is Invalid" });
      }
      if (!isEmailExist[0].is_verified) {
        return res
          .status(400)
          .send({ message: "Please verified your account" });
      }

      //for hashed password (need to wait verification logic)
      // const isValid = await bcrypt.compare(password, isEmailExist[0].password);
      // if (!isValid) {
      //   return res
      //     .status(200)
      //     .send({ message: "Email or Password is incorrect" });
      // }

      //non hashed password for testing using postman
      const storedPassword = isEmailExist[0].password;
      if (password !== storedPassword) {
        return res
          .status(400)
          .send({ message: "Email or Password is incorrect" });
      }

      let payload = {
        id: isEmailExist[0].id_user,
      };
      console.log(payload, "payload");
      const expiresIn = 60 * 60; // Set the token expiration time{1hr}
      const expirationTimestamp = Math.floor(Date.now() / 1000) + expiresIn; // Calculate the expiration timestamp{in second}
      const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn });

      return res.status(200).send({
        message: "Login Success",
        token,
        data: {
          id: isEmailExist[0].id_user,
          email: isEmailExist[0].email,
          fullname: isEmailExist[0].fullname,
          image_path: isEmailExist[0].image_path,
          expToken: expirationTimestamp,
        },
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};