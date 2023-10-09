const asyncHandler = require("express-async-handler");
const {
  createNewBook,
  findManyBooks,
  deleteBookById,
  updateBookById,
  findBookById,
} = require("../services/book.service");

const createBookHandler = asyncHandler(async (req, res) => {
  const { title, author } = req.body;
  const book = await createNewBook({ title, author });
  res.status(201).json(book);
});

const findManyBooksHandler = asyncHandler(async (req, res) => {
  const books = await findManyBooks({ ...req.query });
  res.json(books);
});

const deleteBookHandler = asyncHandler(async (req, res) => {
  const book = await deleteBookById(req.params.id);
  res.status(202).json(book);
});

const updateBookHandler = asyncHandler(async (req, res) => {
  const { title, author } = req.body;
  const book = await updateBookById(req.params.id, { title, author });
  res.status(202).json(book);
});

const lendBookHandler = asyncHandler(async (req, res) => {
  const { action, userId: borrower } = req.body;
  if (!(action && borrower && ["lend", "returned"].includes(action)))
    throw new Error("Bad Request: Action and UserId must be specified");

  const book = await findBookById(req.params.id);

  if (action === "lend") {
    if (!book.isAvailable) throw new Error("Requested Book is not available");
    book.borrower = borrower;
    book.isAvailable = false;
  } else {
    book.borrower = null;
    book.isAvailable = true;
  }

  await book.save();
  const updatedBook = await findBookById(book.id);
  res.status(202).json(updatedBook);
});

module.exports = {
  createBookHandler,
  findManyBooksHandler,
  deleteBookHandler,
  updateBookHandler,
  lendBookHandler,
};
