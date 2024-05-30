const catchAsyncError = require("../middleware/catchAsyncError");

exports.sendToken = catchAsyncError(async (user, res, statuscode) => {
  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  const token = await user.getJsonWebToken();

  res
    .status(statuscode)
    .cookie("token", token, options)
    .json({ success: true, user, token });
});
