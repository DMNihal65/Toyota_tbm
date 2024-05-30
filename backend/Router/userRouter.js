const express = require("express");
const {
  createUser,
  login,
  logout,
  getUsers,
  deleteUser,
  loginWithToken,
} = require("../controller/userController");
const userRouter = express.Router();

const {
  isAuthenticated,
  authorizedRole,
} = require("../middleware/isAuthenticated");

userRouter.route("/login").post(login);
userRouter.route("/tokenlogin").post(loginWithToken);
userRouter.route("/logout").get(logout);

//admin routes
userRouter
  .route("/admin/create")
  .post(isAuthenticated, authorizedRole("admin"), createUser);
userRouter
  .route("/admin/getusers")
  .get(isAuthenticated, authorizedRole("admin"), getUsers);
userRouter
  .route("/admin/delete/:id")
  .delete(isAuthenticated, authorizedRole("admin"), deleteUser);

module.exports = userRouter;
