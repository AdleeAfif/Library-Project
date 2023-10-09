const { User, Session, Role } = require("../models");

const createNewUser = (body) => {
  return User.create({ ...body });
};

const findManyUsers = (searchParams) => {
  return User.findAll({ where: { ...searchParams } });
};

const findUserById = async (id) => {
  const user = User.findByPk(id, { include: [Session, Role] });
  if (!user) throw new Error("Specified user not found");

  return user;
};

const findOneUser = (searchParams) => {
  return User.findOne({ where: { ...searchParams } });
};

const updateUserById = async (id, body) => {
  const user = await findUserById(id);
  if (!user) throw new Error("Specified user not found");

  for (const key of Object.keys(body)) {
    user[key] = body[key] ?? user[key];
  }

  await user.save();
  return user;
};

const deleteUserById = async (id) => {
  const user = await findUserById(id);
  if (!user) throw new Error("Specified user not found");

  await user.destroy();
  return user;
};

module.exports = {
  createNewUser,
  findManyUsers,
  findUserById,
  findOneUser,
  updateUserById,
  deleteUserById,
};
