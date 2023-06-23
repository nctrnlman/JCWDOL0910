require("dotenv").config({
  path: ".env.local",
});
const { db, query } = require("../database");
const nodemailer = require("../middleware/nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getIdFromToken } = require("../helper/jwt-payload");
const { generateOTP } = require("../helper/authHelper");
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../helper/emailHelper");

const env = process.env;

module.exports = {
  register: async (req, res) => {
    try {
      const { email, first_name, last_name, gender } = req.body;
      const fullName = `${first_name} ${last_name}`;

      const getEmailQuery = `SELECT * FROM users WHERE email=${db.escape(
        email
      )}`;
      const isEmailExist = await query(getEmailQuery);

      if (isEmailExist.length > 0) {
        return res.status(400).send({ message: "Email has been used" });
      }

      const otp = generateOTP();

      const addUserQuery = `INSERT INTO users VALUES (null, ${db.escape(
        email
      )}, ${db.escape(first_name)}, ${db.escape(last_name)}, ${db.escape(
        gender
      )}, null,null,false, ${otp})`;
      const addUserResult = await query(addUserQuery);

      const id_user = addUserResult.insertId;

      const token = jwt.sign({ id_user }, env.JWT_SECRET, { expiresIn: "24h" });
      console.log(token);

      await sendVerificationEmail(nodemailer, email, fullName, otp, token);

      return res
        .status(200)
        .send({ data: addUserResult, message: "Register success" });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const isEmailExist = await query(
        `SELECT * FROM users WHERE email=${db.escape(email)}`
      );

      if (isEmailExist.length === 0) {
        return res
          .status(200)
          .send({ message: "Email or Password is Invalid" });
      }

      if (!isEmailExist[0].is_verified) {
        return res.status(400).send({ message: "Please verify your account" });
      }

      const isValid = await bcrypt.compare(password, isEmailExist[0].password);
      if (!isValid) {
        return res
          .status(400)
          .send({ message: "Email or Password is incorrect" });
      }

      const payload = {
        id_user: isEmailExist[0].id_user,
      };
      console.log(payload);
      const expiresIn = 60 * 60; // Set the token expiration time to 1 hour
      const expirationTimestamp = Math.floor(Date.now() / 1000) + expiresIn; // Calculate the expiration timestamp (in seconds)
      const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn });
      return res.status(200).send({
        message: "Login Success",
        token,
        data: {
          id: isEmailExist[0].id_user,
          email: isEmailExist[0].email,
          first_name: isEmailExist[0].first_name,
          last_name: isEmailExist[0].last_name,
          image_path: isEmailExist[0].image_path,
          expToken: expirationTimestamp,
        },
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  verify: async (req, res) => {
    try {
      const { otp, password, confirmPassword } = req.body;
      const userId = getIdFromToken(req, res);

      if (password !== confirmPassword) {
        return res.status(400).send({ message: "Password not same" });
      }

      const checkEmail = await query(
        `SELECT * FROM users WHERE id_user =${db.escape(userId)}`
      );

      if (parseInt(otp) !== checkEmail[0].otp) {
        return res.status(400).send({ message: "OTP not same" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await query(
        `UPDATE users SET password = ${db.escape(
          hashPassword
        )}, is_verified = true, otp = null WHERE id_user = ${db.escape(userId)}`
      );

      return res.status(200).send({ message: "Verification successful." });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  forgetPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const checkEmail = await query(
        `SELECT * FROM users WHERE email = ${db.escape(email)}`
      );

      if (checkEmail.length === 0) {
        return res
          .status(200)
          .send({ message: "Email does not exist", success: false });
      }

      const payload = { id_user: checkEmail[0].id_user };

      const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1h" });

      await sendResetPasswordEmail(nodemailer, email, token);

      return res
        .status(200)
        .send({ message: "Reset password email sent successfully." });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { newPassword, confirmPassword } = req.body;

      const userId = getIdFromToken(req, res);

      if (newPassword !== confirmPassword) {
        return res
          .status(200)
          .send({ message: "Password is not the same", success: false });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);

      await query(
        `UPDATE users SET password = ${db.escape(
          hashPassword
        )} WHERE id_user = ${db.escape(userId)}`
      );

      return res
        .status(200)
        .send({ message: "Reset password successful.", success: true });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};
