const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./UserModel");

const Room = sequelize.define("Room", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userIds: {
    type: DataTypes.ARRAY(DataTypes.UUID),
  },
});
Room.sync({ force: true });
module.exports = Room;