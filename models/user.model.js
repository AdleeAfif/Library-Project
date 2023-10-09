const Sequelize = require("sequelize");
const bcryptjs = require("bcryptjs");

/**
 *
 * @openapi
 * components:
 *  schemas:
 *    UserDto:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          readOnly: true
 *          example: "123e4567-e89b-12d3-a456-426614174000"
 *        username:
 *          type: string
 *          example: "john_doe"
 *        email:
 *          type: string
 *          format: email
 *          example: "john.doe.com"
 *        password:
 *          type: string
 *          format: password
 *          writeOnly: true
 *          example: "secretpassword"
 *        isStaff:
 *          type: boolean
 *          example: false
 *        createdAt:
 *          type: string
 *          format: date-time
 *          readOnly: true
 *          example: "2023-10-08T12:00:00Z"
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          readOnly: true
 *          example: "2023-10-08T14:30:00Z"
 *
 *    CreateUserDto:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          example: "john_doe"
 *        email:
 *          type: string
 *          format: email
 *          example: "john.doe.com"
 *        password:
 *          type: string
 *          format: password
 *          writeOnly: true
 *          example: "secretpassword"
 *
 *    UpdateUserDto:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          example: "john_doe"
 *        email:
 *          type: string
 *          format: email
 *          example: "john.doe.com"
 *
 *    LoginUserDto:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          example: "john.doe.com"
 *        password:
 *          type: string
 *          format: password
 *          writeOnly: true
 *          example: "secretpassword"
 *
 *    CreateStaffDto:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          example: "john_doe"
 *        email:
 *          type: string
 *          format: email
 *          example: "john.doe.com"
 *        password:
 *          type: string
 *          format: password
 *          writeOnly: true
 *          example: "secretpassword"
 *        roleId:
 *          type: string
 *          example: "f8364efe-43f9-430e-9ea1-0ae51900c5e5"
 *
 *    UpdateStaffDto:
 *      type: object
 *      properties:
 *        staffId:
 *          type: string
 *          example: "f8364efe-43f9-430e-9ea1-0ae51900c5e5"
 */

const userModel = (db) => {
  return db.define(
    "User",
    {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      isStaff: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeSave: async (user) => {
          if (user.changed("password")) {
            const salt = await bcryptjs.genSalt(10);
            const hash = await bcryptjs.hash(user.password, salt);
            user.password = hash;
          }
        },
      },
    }
  );
};

module.exports = { userModel };
