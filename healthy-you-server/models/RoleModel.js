const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
    require: true,
    allowNull: false,
  },
});

module.exports = Role;
