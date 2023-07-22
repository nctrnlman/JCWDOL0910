module.exports = {
  sendVerificationEmail: async (nodemailer, email, fullName, otp, token) => {
    const mailOptions = {
      from: `Admin <rhazesnote@gmail.com>`,
      to: email,
      subject: `Verify your account`,
      html: `
      <div>
        <p>Thanks for registering, ${fullName}! Please verify your account by entering the OTP below or by clicking on the following link:</p>
        <p>OTP: <strong>${otp}</strong></p>
        <p>Verification Link: <a href="http://localhost:3000/verification/?email=${email}&token=${token}">Click here to verify</a></p>
        <p>Please note that you need to enter the provided OTP in the verification link.</p>
      </div>
    `,
    };

    const response = await nodemailer.sendMail(mailOptions);
  },

  sendResetPasswordEmail: async (nodemailer, email, token) => {
    const mailOptions = {
      from: `Admin <rhazesnote@gmail.com>`,
      to: email,
      subject: `Reset Password`,
      html: `
      <div>
        <p>You have requested to reset your password. Don't send it to anyone</p>
        <p>please click the link below to reset your password</p>
        <h2><a href="http://localhost:3000/reset-password/?email=${email}&token=${token}">Click Here</a></h2>
      </div>
    `,
    };
    const response = await nodemailer.sendMail(mailOptions);
  },
};
