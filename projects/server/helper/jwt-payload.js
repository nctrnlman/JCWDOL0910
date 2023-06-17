const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: ".env.local",
});
module.exports = {
  // getIdFromToken is a helper function to get user id from token and if token is not valid, it will return 401 status code
  getIdFromToken: (req, resp) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      resp.status(401).json({
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded?.id;
  },
};
