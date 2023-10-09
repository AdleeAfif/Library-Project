const { Role } = require("../models");

const createNewRole = (body) => {
  return Role.create({ ...body });
};

const findManyRoles = (searchParams) => {
  return Role.findAll({ where: { ...searchParams } });
};

const findRoleById = async (id) => {
  const role = Role.findByPk(id);
  if (!role) throw new Error("Specified role not found");

  return role;
};

const findOneRole = (searchParams) => {
  return Role.findOne({ where: { ...searchParams } });
};

const updateRoleById = async (id, body) => {
  const role = await findRoleById(id);

  for (const key of Object.keys(body)) {
    role[key] = body[key] ?? role[key];
  }

  await role.save();
  return role;
};

const deleteRoleById = async (id) => {
  const role = await findRoleById(id);

  await role.destroy();
  return role;
};

module.exports = {
  createNewRole,
  findManyRoles,
  findRoleById,
  findOneRole,
  updateRoleById,
  deleteRoleById,
};
