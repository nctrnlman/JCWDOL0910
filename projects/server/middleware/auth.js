require("dotenv").config({
  path: ".env.local",
});
const jwt = require("jsonwebtoken");
const env = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Assuming the token is passed in the Authorization header

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    // Token is valid and not expired
    console.log("Token is valid");
    console.log(decoded); // Access the decoded payload if needed
    req.user = decoded; // Set the decoded payload on the req object for further use in subsequent middleware or route handlers
    next(); // Call next() to proceed to the next middleware or route handler
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("Token has expired");
      // Handle the case where the token is expired
      return res.status(401).json({ message: "Token has expired" });
    } else {
      console.log("Invalid token");
      // Handle the case where the token is invalid for other reasons
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};

module.exports = verifyToken;
