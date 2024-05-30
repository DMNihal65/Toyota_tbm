const express = require("express");

const { getPendingTaskList, generatePendingTaskList, updateResult } = require("../controller/pendingTaskController");
const pendingRouter = express.Router();

//routes
pendingRouter.route("/generate").get(generatePendingTaskList);
pendingRouter.route("/").get(getPendingTaskList);
pendingRouter.put('/:id', updateResult);

module.exports = pendingRouter;
