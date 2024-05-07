const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./UserModel");
const Room = require("./RoomModel");

const RoomUsers = sequelize.define(
  "RoomUsers",
  {},
  {
    timestamps: false,
  }
);

User.belongsToMany(Room, {
  through: "RoomUsers",
});
Room.belongsToMany(User, {
  through: "RoomUsers",
});

RoomUsers.sync({ alter: true });
module.exports = RoomUsers;
