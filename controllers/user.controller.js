const asyncHandler = require("express-async-handler");
const { createNewUser, updateUserById } = require("../services/user.service");
const {
  createNewSession,
  deleteSessionById,
} = require("../services/session.service");

const signUphandler = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  if (!(username && password && email))
    res.status(400).json({
      msg: "Bad Request. Please check your sign up credentials",
    });

  const user = await createNewUser({ username, password, email });
  res.status(201).json(user);
});

const getCurrentUserHandler = async (req, res) => {
  await createNewSession({ userId: req.user.id });
  res.json(req.user);
};

// const loginHandler = asyncHandler(async (req, res) => {
//   const session = await createNewSession({ userId: user.id });

//   res.status(200).json({ msg: "Login successful", session });
// });

const logOutHandler = async (req, res) => {
  await deleteSessionById(req.user.Session.id);
  req.logout((err) => {
    if (err) throw new Error("User unable to log out!");
  });
  res.status(200).json({
    msg: "User logged out successfully",
  });
};

const updateUserHandler = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const user = await updateUserById(req.user.id, { email, username, password });
  res.json(user);
});

module.exports = {
  signUphandler,
  getCurrentUserHandler,
  logOutHandler,
  updateUserHandler,
};
