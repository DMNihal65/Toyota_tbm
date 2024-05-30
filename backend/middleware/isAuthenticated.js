const jwt = require("jsonwebtoken");
const userModel = require("../mongoSchema/userModel");
const ErrorHandler = require("../util/errorHandling");

const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new ErrorHandler("Login before accessing this route", 400));
  }
  const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
  const user = await userModel.findById(decodedToken.id);
  if (!user) {
    return next(new ErrorHandler("Re-login to access this route", 400));
  }
  req.user = user;
  next();
});

exports.authorizedRole = (...roles) =>
  catchAsyncError(async (req, res, next) => {
    roles.forEach((role) => {
      if (role === req.user.role) {
        next();
      } else {
        return next(
          new ErrorHandler("user dont have Authority to create user", 400)
        );
      }
    });
  });
