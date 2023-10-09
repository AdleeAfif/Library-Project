const { Router } = require("express");
const {
  signUphandler,
  getCurrentUserHandler,
  logOutHandler,
  updateUserHandler,
} = require("../controllers/user.controller");
const passport = require("passport");
const { isAuthenticated } = require("../middlewares/access-control.middleware");

const router = Router();

/**
 * @openapi
 * /users:
 *  post:
 *    tags:
 *      - Users
 *    summary: Create a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateUserDto"
 *    responses:
 *      201:
 *        description: Created a new user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UserDto"
 *
 *  get:
 *    tags:
 *      - Users
 *    summary: Get current user details
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success, return current user details
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UserDto"
 *
 *  patch:
 *    tags:
 *      - Users
 *    summary: Update user details
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateUserDto"
 *    responses:
 *      200:
 *        description: Successfully updated user details
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UserDto"
 *
 * /users/login:
 *  post:
 *    tags:
 *      - Users
 *    summary: User login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/LoginUserDto"
 *    responses:
 *      200:
 *        description: Success, user logged in
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UserDto"
 *
 * /users/logout:
 *  post:
 *    tags:
 *      - Users
 *    summary: User logout
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success, user logged out
 */

router
  .route("/")
  .post(signUphandler)
  .get(isAuthenticated, getCurrentUserHandler)
  .patch(isAuthenticated, updateUserHandler);

router
  .route("/login")
  .post(passport.authenticate("local"), getCurrentUserHandler);

router.route("/logout").post(isAuthenticated, logOutHandler);

module.exports = router;
