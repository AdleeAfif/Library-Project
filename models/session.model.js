const Sequelize = require("sequelize");

const sessionModel = (db) => {
  return db.define("Session", {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
  });
};

module.exports = { sessionModel };
