const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const Room = sequelize.define("Room", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
});

module.exports = Room;
