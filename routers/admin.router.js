const { Router } = require("express");

const {
  isAuthenticated,
  isStaff,
  hasPermission,
} = require("../middlewares/access-control.middleware");
const {
  findAllStaffHandler,
  createStaffHandler,
  updateStaffHandler,
  deleteStaffHandler,
  findAllUserHandler,
  deleteUserHandler,
} = require("../controllers/admin.controller");

const router = Router();

/**
 * @openapi
 * /admin/staff:
 *  get:
 *    tags:
 *      - Admin
 *    summary: Get all staff members
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success, return all staff members in an array
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/UserDto"
 *
 *  post:
 *    tags:
 *      - Admin
 *    summary: Create a new staff member
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateStaffDto"
 *    responses:
 *      201:
 *        description: Created a new staff member
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UserDto"
 *
 * /admin/staff/{id}:
 *  patch:
 *    tags:
 *      - Admin
 *    summary: Update a staff member by ID
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateStaffDto"
 *    responses:
 *      200:
 *        description: Successfully updated the staff member
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UserDto"
 *
 *  delete:
 *    tags:
 *      - Admin
 *    summary: Delete a staff member by ID
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      204:
 *        description: Staff member deleted successfully
 *      404:
 *        description: Staff member not found
 *
 * /admin/users:
 *  get:
 *    tags:
 *      - Admin
 *    summary: Get all users (admin access required)
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success, return all users in an array
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/UserDto"
 *
 * /admin/users/{id}:
 *  delete:
 *    tags:
 *      - Admin
 *    summary: Delete a user by ID (admin access required)
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      204:
 *        description: User deleted successfully
 *      404:
 *        description: User not found
 *      403:
 *        description: Forbidden - Insufficient permissions
 */

router.use(isAuthenticated);
router.use(isStaff);
router.use(hasPermission("canManageStaff"));

router.route("/").get((req, res) => {
  res.json({
    message: "Welcome to the admin page",
  });
});

router.route("/staff").get(findAllStaffHandler).post(createStaffHandler);

router.route("/staff/:id").patch(updateStaffHandler).delete(deleteStaffHandler);

router.route("/users").get(hasPermission("canManageUser"), findAllUserHandler);

router
  .route("/users/:id")
  .delete(hasPermission("canManageUser"), deleteUserHandler);

module.exports = router;
