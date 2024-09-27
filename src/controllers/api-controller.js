const apiController = {
  index: (req, res) => {
    const user = req.authenticatedUser;

    if (!user) {
      return res.status(200).json({
        message: "Welcome visitor, register or log in for more features!",
      });
    }

    res.status(200).json({ message: `Welcome back, ${user.username}!` });
  },
};

module.exports = apiController;
