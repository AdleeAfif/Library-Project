const expressAsyncHandler = require("express-async-handler");

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else throw new Error("User is not logged in!");
});

const isStaff = (req, res, next) => {
  if (req.user.isStaff) return next();
  res.status(403);
  throw new Error("You do not have permission to perform this action");
};

const hasPermission = (permission) => {
  return (req, res, next) => {
    if (req.user.Role[permission]) return next();
    res.status(403);
    throw new Error("You don't have the required permissions");
  };
};

module.exports = { isAuthenticated, isStaff, hasPermission };
