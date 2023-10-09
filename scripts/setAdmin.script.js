const { createNewRole } = require("../services/role.service");
const { findUserById } = require("../services/user.service");

const setAdmin = async () => {
  const admin = await createNewRole({
    name: "admin",
    canLendBooks: true,
    canManageBooks: true,
    canManageUser: true,
    canManageStaff: true,
  });

  const user = await findUserById("154b5589-6e9d-42f3-aadd-3bdf6ec5539c");
  user.isStaff = true;
  user.roleId = admin.id;

  await user.save();
  console.log(user);
};

setAdmin();
