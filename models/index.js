const Sequelize = require("sequelize");
const { bookModel } = require("./book.model");
const { userModel } = require("./user.model");
const { sessionModel } = require("./session.model");
const { roleModel } = require("./role.model");

const {
  DB_PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWD,
  DB_NAME,
} = require("../configs/env.config");

const db = new Sequelize({
  dialect: "mysql",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWD,
  port: DB_PORT,
  database: DB_NAME,
});

const Book = bookModel(db);
const User = userModel(db);
const Session = sessionModel(db);
const Role = roleModel(db);

User.hasMany(Book, { foreignKey: "borrower" });
Book.belongsTo(User, { foreignKey: "borrower" });

User.hasOne(Session, { foreignKey: "userId" });
Session.belongsTo(User, { foreignKey: "userId" });

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

module.exports = { db, Book, User, Session, Role };
