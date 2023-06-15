const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: ".env.local",
});

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).send({
      message: "Unauthorized",
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" &&
      error.message === "jwt malformed"
    ) {
      return res.status(400).send({
        message: "Malformed token",
      });
    } else {
      console.error("JWT verification error:", error.message);
      return res.status(400).send({
        message: "Invalid token",
      });
    }
  }
};

module.exports = authenticateToken;
