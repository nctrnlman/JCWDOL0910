const jwt = require("jsonwebtoken");
// 
const verifyToken = (req, res, next) => {
    // console.log(req)
    let token = req.headers.authorization;
    console.log(token)

    if (!token) {
        return res.status(400).send({ message: "Access Denied" });
    }

    token = token.split(" ")[1];
    if (token == "null" || !token) {
        return res.status(400).send({ message: "Access Denied" });
    }

    let verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifiedUser)
    if (!verifiedUser) {
        return res.status(400).send({ message: "Access Denied" });
    }

    console.log(verifiedUser)
    req.user = verifiedUser;
    next();
};

module.exports = { verifyToken };