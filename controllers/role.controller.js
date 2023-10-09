const asyncHandler = require("express-async-handler");
const {
  createNewRole,
  updateRoleById,
  deleteRoleById,
  findManyRoles,
} = require("../services/role.service");

const createRoleHandler = asyncHandler(async (req, res) => {
  const { name, ...perms } = req.body;
  const role = await createNewRole({ name, ...perms });
  res.status(201).json(role);
});

const updateRoleHandler = asyncHandler(async (req, res) => {
  const { name, ...perms } = await req.body;
  const role = await updateRoleById(req.params.id, { name, ...perms });
  res.status(202).json(role);
});

const deleteRoleHandler = asyncHandler(async (req, res) => {
  const role = await deleteRoleById(req.params.id);
  res.status(202).json(role);
});

const findAllRoleHandler = asyncHandler(async (req, res) => {
  const roles = await findManyRoles({});
  res.json(roles);
});

module.exports = {
  createRoleHandler,
  updateRoleHandler,
  deleteRoleHandler,
  findAllRoleHandler,
};
