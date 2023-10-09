const Sequelize = require("sequelize");

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateBookDto:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          default: A book stored in library
 *        author:
 *          type: string
 *          default: Adlee Afif
 *      required:
 *        - title
 *        - author
 *    UpdateBookDto:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          default: A book stored in library
 *        author:
 *          type: string
 *          default: Adlee Afif
 *      required:
 *    LendBookDto:
 *      type: object
 *      properties:
 *        action:
 *          type: string
 *        isAvailable:
 *          type: boolean
 *      required:
 *
 *    BookDto:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        title:
 *          type: string
 *        author:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date
 *        updatedAt:
 *          type: string
 *          format: date
 *        isAvailable:
 *          type: boolean
 *          default: true
 */

const bookModel = (db) => {
  return db.define("Book", {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    isAvailable: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};

module.exports = { bookModel };
