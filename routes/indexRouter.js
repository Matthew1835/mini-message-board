const { Router } = require("express");
const messagesController = require("../controllers/messagesController");
const indexRouter = Router();

indexRouter.get("/", messagesController.getMessages);
indexRouter.get("/new", messagesController.createMessageGet);
indexRouter.post("/new", messagesController.createMessagePost);
indexRouter.get("/message/:id", messagesController.getMessage)

module.exports = indexRouter;