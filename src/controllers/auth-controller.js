const jwt = require("jsonwebtoken");

const users = require("../models/users");

const secretKey = "CHAVEULTRASECRETA";

const authController = {
  register: (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Invalid fields!" });
    }

    const userAlreadyExists = users.find((user) => user.email === email);
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ message: "This email is already registered!" });
    }

    const newUser = { username, email, password, role: "standard" };
    users.push(newUser);

    res.status(201).json({
      message: `User ${newUser.username}, ${newUser.email} successfully registered!`,
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    const user = users.find((usr) => usr.email === email);

    if (!user || password !== user.password)
      return res.status(404).json({ message: "Invalid credentials!" });

    const payload = {
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.status(200).json(token);
  },
};

module.exports = authController;
