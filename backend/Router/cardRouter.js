const express = require("express");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const {
  createCard,
  updateCard,
  deleteCard,
  getCard,
  getCardAll,
} = require("../controller/cardController");

const cardRouter = express.Router();

cardRouter.route("/create").post(createCard);
cardRouter
  .route("/update/:id")
  .put(updateCard)
  .delete(deleteCard);

cardRouter.route("/find/:id").get(getCard);
cardRouter.route("/find/fromDate/:fromDate/toDate/:toDate").get(getCardAll);

module.exports = cardRouter;
