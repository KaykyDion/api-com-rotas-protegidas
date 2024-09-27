const express = require("express");

const users = require("../models/users");
const {
  authMiddleware,
  verifyAdmin,
} = require("../middlewares/auth-middleware");
const adminController = require("../controllers/admin-controller");

const adminRouter = express.Router();

adminRouter.get("/", authMiddleware, verifyAdmin, adminController.index);

adminRouter.delete(
  "/users",
  authMiddleware,
  verifyAdmin,
  adminController.deleteUser
);

adminRouter.get(
  "/users/user",
  authMiddleware,
  verifyAdmin,
  adminController.readUser
);

adminRouter.post(
  "/users",
  authMiddleware,
  verifyAdmin,
  adminController.createAdmin
);

module.exports = adminRouter;
