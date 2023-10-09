const Sequelize = require("sequelize");

/**
 *
 * @openapi
 * components:
 *  schemas:
 *    RoleDto:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          readOnly: true
 *          example: "123e4567-e89b-12d3-a456-426614174000"
 *        name:
 *          type: string
 *          example: "admin"
 *        canLendBooks:
 *          type: boolean
 *          example: false
 *        canManageBooks:
 *          type: boolean
 *          example: false
 *        canManageStaff:
 *          type: boolean
 *          example: false
 *        canManageUser:
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
 *    CreateRoleDto:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: "admin"
 *
 *    UpdateRoleDto:
 *      type: object
 *      properties:
 *        canLendBooks:
 *          type: boolean
 *          example: false
 *        canManageBooks:
 *          type: boolean
 *          example: false
 */

const roleModel = (db) => {
  return db.define("Role", {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    canLendBooks: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    canManageBooks: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    canManageStaff: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    canManageUser: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });
};

module.exports = { roleModel };
