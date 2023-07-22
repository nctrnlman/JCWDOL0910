const jwt = require("jsonwebtoken");
//
const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(400).send({ message: "Access Denied" });
  }

  token = token.split(" ")[1];
  if (token == "null" || !token) {
    return res.status(400).send({ message: "Access Denied" });
  }

  let verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
  if (!verifiedUser) {
    return res.status(400).send({ message: "Access Denied" });
  }

  req.user = verifiedUser;
  next();
};

module.exports = { verifyToken };
