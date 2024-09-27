const express = require("express");

const { authMiddleware } = require("../middlewares/auth-middleware");
const apiController = require("../controllers/api-controller");

const apiRouter = express.Router();

apiRouter.get("/home", authMiddleware, apiController.index);

module.exports = apiRouter;
