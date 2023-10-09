const { Router } = require("express");
const {
  createBookHandler,
  findManyBooksHandler,
  updateBookHandler,
  deleteBookHandler,
  lendBookHandler,
} = require("../controllers/book.controller");
const {
  isAuthenticated,
  isStaff,
  hasPermission,
} = require("../middlewares/access-control.middleware");

const router = Router();

/**
 * @openapi
 * /books:
 *  get:
 *    tags:
 *      - Books
 *    summary: Get all the books
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success, return all the books in array
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/BookDto"
 *      500:
 *        description: Internal server error
 *
 *  post:
 *    tags:
 *      - Books
 *    summary: Create a new book
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/CreateBookDto"
 *    responses:
 *      201:
 *        description: Created a new book
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/BookDto"
 *
 * /books/{id}:
 *  patch:
 *    tags:
 *      - Books
 *    summary: Update a book by ID
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
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UpdateBookDto"
 *    responses:
 *      202:
 *        description: Successfully updated the book
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/BookDto"
 *
 *  delete:
 *    tags:
 *      - Books
 *    summary: Delete a book by ID
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      202:
 *        description: Successfully updated the book
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/BookDto"
 *
 * /books/{id}/lend:
 *  patch:
 *    tags:
 *      - Books
 *    summary: Update a book status when lend or returned
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
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/LendBookDto"
 *    responses:
 *      202:
 *        description: Successfully updated the book availability status
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/BookDto"
 */

router.use(isAuthenticated);
router.use(isStaff);

router
  .route("/")
  .post(hasPermission("canManageBooks"), createBookHandler)
  .get(hasPermission("canLendBooks"), findManyBooksHandler);

router
  .route("/:id")
  .patch(hasPermission("canManageBooks"), updateBookHandler)
  .delete(hasPermission("canManageBooks"), deleteBookHandler);

router.route("/:id/lend").patch(hasPermission("canLendBooks"), lendBookHandler);

module.exports = router;
