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
    let payload = { id: addUserResult.insertId };

    const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1h" });

    let mail = {
      from: `Admin <rhazesnote@gmail.com>`,
      to: `${email}`,
      subject: `Verify your account`,
      html: `
      <div>
        <p>Thanks for registering, ${fullName}! Please verify your account by entering the OTP below:</p>
        <h2>${otp}</h2>
        <h2><a href="http://localhost:3000/verification/${token}">Click Here</a></h2>
      </div>
      `,
    };

    let response = await nodemailer.sendMail(mail);

    return res
      .status(200)
      .send({ data: addUserResult, message: "Register success" });
  },
  verify: async (req, res) => {
    try {
      const { otp, password, confirmPassword } = req.body;
      const token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, env.JWT_SECRET);
      const userId = decodedToken.id;

      if (password !== confirmPassword) {
        return res.status(400).send({ message: "Password not same" });
      }

      let checkEmail = await query(
        `SELECT * FROM users WHERE id_user =${db.escape(userId)}`
      );

      if (otp != checkEmail[0].otp) {
        return res.status(400).send({ message: "otp not same" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const passwordQuery = await query(
        `UPDATE users SET password = ${db.escape(
          hashPassword
        )} WHERE id_user = ${db.escape(userId)}`
      );

      const updateVerified = await query(
        `UPDATE users SET is_verified = true where id_user = ${db.escape(
          userId
        )}`
      );

      const updateOtp = await query(
        `UPDATE users SET otp = null where id_user = ${db.escape(userId)}`
      );

      return res.status(200).send({ message: "Verification successfully." });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
  forgetPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const checkEmail = await query(
        `SELECT * FROM users WHERE email = ${db.escape(email)}`
      );

      //check email
      if (checkEmail.length == 0) {
        return res
          .status(200)
          .send({ message: "Email is not exist", success: false });
      }

      //generate token
      let payload = { id: checkEmail[0].id_user };

      const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "10m" });

      //add token to database
      const addtoken = await query(
        `UPDATE users SET reset_password_token = ${db.escape(
          token
        )} WHERE email = ${db.escape(email)}`
      );

      let mail = {
        from: `Admin <rhazesnote@gmail.com>`,
        to: `${email}`,
        subject: `Reset Password`,
        html: `
        <div>
          <p>You have requested to reset your password. Don't send it to anyone</p>
          <p>please click the link below to reset your password</p>
          <h2><a href="http://localhost:3000/reset-password/${token}">Click Here</a></h2>
        </div>
        `,
      };

      let response = await nodemailer.sendMail(mail);

      return res
        .status(200)
        .send({ message: "Reset password email sent successfully." });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { newPassword, confirmPassword } = req.body;
      const token = req.headers.authorization.split(" ")[1];

      console.log(token);
      if (!token) {
        return res.status(401).json({ message: "Token not found" });
      }

      const decodedToken = jwt.verify(token, env.JWT_SECRET);
      const userId = decodedToken.id;
      console.log(userId, "reset pw");

      if (newPassword !== confirmPassword) {
        return res
          .status(200)
          .send({ message: "Password is not same", success: false });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);

      const tes = `UPDATE users SET password = ${db.escape(
        hashPassword
      )} WHERE id_user = ${db.escape(userId)}`;

      const resetPassword = await query(tes);
      console.log(resetPassword);

      const resetToken = await query(
        `UPDATE users SET reset_password_token = NULL WHERE id_user = ${db.escape(
          userId
        )}`
      );

      return res.status(200).send({ message: "Reset password successfully." });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
};
