const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: ".env.local",
});

module.exports = {
  // getIdFromToken is a helper function to get user id from token and if token is not valid, it will return 401 status code
  getIdFromToken: (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded?.id;
    } catch (error) {
      console.error("Error decoding token: ", error);
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }
  },

  getRoleFromToken: (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded?.role;
    } catch (error) {
      console.error("Error decoding token: ", error);
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }
  },
};
