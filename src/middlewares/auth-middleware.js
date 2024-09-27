const jwt = require("jsonwebtoken");
const users = require("../models/users");
const secretKey = "CHAVEULTRASECRETA";

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next();
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedUser = jwt.verify(token, secretKey);

    const user = users.find((usr) => usr.email === decodedUser.email);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.authenticatedUser = user;
  } catch (error) {
    return res.status(401).json({ message: "invalid token!" });
  }

  next();
};

const verifyAdmin = (req, res, next) => {
  const user = req.authenticatedUser;

  if (!user || user.role !== "admin") {
    return res.status(401).json({ message: "User not authorized!" });
  }

  next();
};

module.exports = { authMiddleware, verifyAdmin };
