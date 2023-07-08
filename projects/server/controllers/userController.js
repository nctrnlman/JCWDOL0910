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
      )}, null,null,false, ${otp},false)`;
      const addUserResult = await query(addUserQuery);

      const id = addUserResult.insertId;

      const token = jwt.sign({ id }, env.JWT_SECRET, { expiresIn: "24h" });
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
        id: isEmailExist[0].id_user,
      };
      console.log(payload, "paylooaddd");
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
      const { otp, password } = req.body;
      const userId = getIdFromToken(req, res);

      const checkEmail = await query(
        `SELECT * FROM users WHERE id_user =${db.escape(userId)}`
      );

      if (checkEmail[0].otp === null) {
        return res
          .status(400)
          .send({ message: "Account already verified", success: false });
      }

      if (parseInt(otp) !== checkEmail[0].otp) {
        return res
          .status(400)
          .send({ message: "Incorrect Verification Code", success: false });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await query(
        `UPDATE users SET password = ${db.escape(
          hashPassword
        )}, is_verified = true, otp = null WHERE id_user = ${db.escape(userId)}`
      );

      return res
        .status(200)
        .send({ message: "Verification successful", success: true });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(400).send({
          message:
            "Verification has expired. Please request verification again",
          success: false,
        });
      }
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
          .status(400)
          .send({ message: "Email does not exist", success: false });
      }

      const userId = checkEmail[0].id_user;
      const payload = { id: userId };
      const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1h" });

      await sendResetPasswordEmail(nodemailer, email, token);

      await query(
        `UPDATE users SET reset_token = TRUE WHERE id_user = ${db.escape(
          userId
        )}`
      );

      return res.status(200).send({
        message: "Reset password email has been sent successfully",
        success: true,
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { newPassword } = req.body;

      const userId = getIdFromToken(req, res);

      const user = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(
          userId
        )} AND reset_token = TRUE`
      );

      if (user.length === 0) {
        return res.status(400).send({
          message: "Password already reset",
          success: false,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);

      await query(
        `UPDATE users SET password = ${db.escape(
          hashPassword
        )},reset_token = FALSE WHERE id_user = ${db.escape(userId)}`
      );

      return res
        .status(200)
        .send({ message: "Password reset successful", success: true });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(400).send({
          message: "Please request password reset again",
          success: false,
        });
      }
      res.status(error.status || 500).send(error);
    }
  },
};
