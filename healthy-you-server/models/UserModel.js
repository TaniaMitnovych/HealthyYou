const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Role = require("./RoleModel");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.DATE,
  },
  sex: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
});
Role.hasOne(User, {
  foreignKey: {
    name: "roleId",
    allowNull: false,
  },
});
User.belongsTo(Role, {
  foreignKey: {
    name: "roleId",
    allowNull: false,
  },
});
module.exports = User;
