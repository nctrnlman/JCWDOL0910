const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: ".env.local",
});

module.exports = {
  getIdFromToken: (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
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
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }
  },
};
