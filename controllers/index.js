const asyncHandler = require("express-async-handler");

const getInfoHandler = asyncHandler(async (req, res) => {
  res.json({
    msg: "Go to /user/login to login into the system or /user to sign up if you didn't sign up yet.",
  });
});

module.exports = { getInfoHandler };
