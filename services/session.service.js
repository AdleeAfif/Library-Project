const { Session, User, Role } = require("../models");

const createNewSession = async (body) => {
  return Session.create({ ...body });
};

const findSessionById = async (id) => {
  return Session.findByPk(id, { include: [{ model: User, include: [Role] }] });
};

const deleteSessionById = async (id) => {
  console.log(id);
  const session = await findSessionById(id);
  session.destroy();
  return session;
};

module.exports = { createNewSession, findSessionById, deleteSessionById };
