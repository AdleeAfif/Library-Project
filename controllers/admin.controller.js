const asyncHandler = require("express-async-handler");
const {
  findManyUsers,
  createNewUser,
  deleteUserById,
  updateUserById,
} = require("../services/user.service");
const { updateUserHandler } = require("./user.controller");

const findAllStaffHandler = asyncHandler(async (req, res) => {
  const staffs = await findManyUsers({ isStaff: true });
  res.json(staffs);
});

const createStaffHandler = asyncHandler(async (req, res) => {
  const { roleId, email, username, password } = req.body;
  if (!(roleId && email && username && password))
    throw new Error("Bad Request: Please fill in all the fields.");
  const newStaff = await createNewUser({
    roleId,
    email,
    username,
    password,
    isStaff: true,
  });
  res.status(201).json(newStaff);
});

const updateStaffHandler = asyncHandler(async (req, res) => {
  const { roleId, email, username, password } = await req.body;
  const updatedStaff = await updateUserById(req.params.id, {
    roleId,
    email,
    username,
    password,
  });
  res.status(202).json(updatedStaff);
});

const deleteStaffHandler = asyncHandler(async (req, res) => {
  const staff = await updateUserById(req.params.id, {
    isStaff: false,
  });
  staff.roleId = null;
  await staff.save();
  res.status(202).json(staff);
});

const findAllUserHandler = asyncHandler(async (req, res) => {
  const users = await findManyUsers({});
  res.json(users);
});

const deleteUserHandler = asyncHandler(async (req, res) => {
  const user = await deleteUserById(req.params.id);
  res.status(202).json(user);
});

module.exports = {
  updateStaffHandler,
  deleteStaffHandler,
  findAllStaffHandler,
  createStaffHandler,
  findAllUserHandler,
  deleteUserHandler,
};
