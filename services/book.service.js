const { Book, User } = require("../models");

const createNewBook = (body) => {
  return Book.create({ ...body });
};

const findManyBooks = (searchParams) => {
  return Book.findAll({ where: { ...searchParams } });
};

const findBookById = async (id) => {
  const book = Book.findByPk(id, { include: [User] });
  if (!book) throw new Error("Specified book not found");

  return book;
};

const findOneBook = (searchParams) => {
  return Book.findOne({ where: { ...searchParams } });
};

const updateBookById = async (id, body) => {
  const book = await findBookById(id);

  for (const key of Object.keys(body)) {
    book[key] = body[key] ?? book[key];
  }

  await book.save();
  return book;
};

const deleteBookById = async (id) => {
  const book = await findBookById(id);

  await book.destroy();
  return book;
};

module.exports = {
  createNewBook,
  findManyBooks,
  findBookById,
  findOneBook,
  updateBookById,
  deleteBookById,
};
