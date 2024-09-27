const users = require("../models/users");

const adminController = {
  index: (req, res) => {
    const user = req.authenticatedUser;

    if (!user || user.role !== "admin") {
      return res.status(401).json({ message: "User not authorized!" });
    }

    res
      .status(200)
      .json({ message: `Welcome to admin interface, ${user.username}` });
  },

  deleteUser: (req, res) => {
    const { email } = req.body;

    const userToDelete = users.findIndex((usr) => usr.email === email);

    if (userToDelete === -1) {
      return res.status(404).json({ message: "User to delete not found!" });
    }

    const deletedUser = users.splice(userToDelete, 1);

    res.json({
      message: `User: ${deletedUser[0].username} succefullly removed!`,
    });
  },

  readUser: (req, res) => {
    const { email } = req.body;

    const userToRead = users.find((user) => user.email === email);

    if (!userToRead) {
      return res.status(404).json({ message: `User ${email} not found!` });
    }

    res.status(200).json({ user: { ...userToRead } });
  },

  createAdmin: (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "Invalid credentials!" });
    }

    const newAdmin = { username, email, password, role: "admin" };
    users.push(newAdmin);
    res
      .status(201)
      .json({ message: `New admin succefully created! ${newAdmin.username}` });
  },
};

module.exports = adminController;
