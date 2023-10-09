const express = require("express");

const { db } = require("./models");
const { router } = require("./routers");
const { errorHandler } = require("./middlewares/error.handler");
const { PORT, SESSION_SECRET } = require("./configs/env.config");
const session = require("express-session");
const passport = require("passport");
const { initPassport } = require("./utils/passport.util");

initPassport(passport);

const app = express();
app.use(express.json());
app.use(
  session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
  db.sync({});
  // db.sync({ alter: true });
});
