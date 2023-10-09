const Passport = require("passport");
const Strategy = require("passport-local");
const bcryptjs = require("bcryptjs");

const { findOneUser, findUserById } = require("../services/user.service");
const { findSessionById } = require("../services/session.service");

const initPassport = (passport) => {
  const authenticate = async (email, password, callback) => {
    const user = await findOneUser({ email }).catch((err) => callback(err));
    if (!user) callback(Error("User doesn't exist in the system"));
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) callback(Error("Bad Request: Mismatch Credentials"));
    return callback(null, user);
  };

  passport.use(new Strategy({ usernameField: "email" }, authenticate));

  passport.serializeUser((user, callback) => {
    return callback(null, user.id);
  });

  passport.deserializeUser(async (id, callback) => {
    const user = await findUserById(id);
    // const session = await findSessionById();
    callback(null, user);
  });
};

module.exports = { initPassport };
