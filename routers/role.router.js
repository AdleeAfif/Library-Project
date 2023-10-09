const { Router } = require("express");

const {
  isAuthenticated,
  isStaff,
  hasPermission,
} = require("../middlewares/access-control.middleware");
const {
  createRoleHandler,
  findAllRoleHandler,
  updateRoleHandler,
  deleteRoleHandler,
} = require("../controllers/role.controller");

const router = Router();

/**
 * @openapi
 * /roles:
 *  post:
 *    tags:
 *      - Roles
 *    summary: Create a new role
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateRoleDto"
 *    responses:
 *      201:
 *        description: Created a new role
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/RoleDto"
 *
 *  get:
 *    tags:
 *      - Roles
 *    summary: Get all roles
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success, return all roles in an array
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/RoleDto"
 *
 * /roles/{id}:
 *  patch:
 *    tags:
 *      - Roles
 *    summary: Update a role by ID
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
 *            $ref: "#/components/schemas/UpdateRoleDto"
 *    responses:
 *      200:
 *        description: Successfully updated the role
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/RoleDto"
 *
 *  delete:
 *    tags:
 *      - Roles
 *    summary: Delete a role by ID
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
 *        description: Role deleted successfully
 *      404:
 *        description: Role not found
 *      403:
 *        description: Forbidden - Insufficient permissions
 */

router.use(isAuthenticated);
router.use(isStaff);
router.use(hasPermission("canManageStaff"));

router.route("/").post(createRoleHandler).get(findAllRoleHandler);

router.route("/:id").patch(updateRoleHandler).delete(deleteRoleHandler);

module.exports = router;
