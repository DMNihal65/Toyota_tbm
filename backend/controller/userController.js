const catchAsyncError = require("../middleware/catchAsyncError");
const UserModel = require("../mongoSchema/userModel");
const ErrorHandler = require("../util/errorHandling");
const { sendToken } = require("../util/sendToken");
const jwt = require("jsonwebtoken")

exports.createUser = catchAsyncError(async (req, res, next) => {
  
  const { name, password, confirmPassword } = req.body;
  if (!name || !password) {
    return next(new ErrorHandler("Please enter user Name & Password", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler(
        "Entered password & Confirm password should be same",
        400
      )
    );
  }

  const user = await UserModel.create({ name, password });
  if (!user) {
    return next(
      new ErrorHandler(
        `Name "${name}" already exists, please enter different name`
      )
    );
  }
  res
    .status(201)
    .json({ success: true, message: `user ${user.name} created successfully` });
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { name, password } = req.body;
  const user = await UserModel.findOne({ name }).select("+password");
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    return next(new ErrorHandler("Password incorrect", 404));
  }

  sendToken(user, res, 200);
});

exports.loginWithToken = catchAsyncError(async (req, res, next) => {
  const { userId, token } = req.body;
  const user = await UserModel.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  try { 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    if (decoded.id !== userId) {
      return next(new ErrorHandler("Invalid token", 401));
    }

    res.status(200).json({ success: true, message: "Authentication successful", user });
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
});

exports.logout = catchAsyncError((req, res, next) => {
  const options = {
    httpOnly: true,
    expires: new Date(Date.now()),
  };
  res
    .status(200)
    .json({ success: true, message: "Logout successfully" });
});

exports.getUsers = catchAsyncError(async (req, res, next) => {
  const users = await UserModel.find();
  if (users.length === 0) {
    return next(new ErrorHandler("No users available", 401));
  }
  const totalUsers = users.length;

  res.status(201).json({ success: true, totalUsers, users });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }
  await user.remove();
  res
    .status(201)
    .json({ success: true, message: `user ${user.name} removed successfully` });
});
