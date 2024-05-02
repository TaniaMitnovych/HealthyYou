const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./UserModel");
const Room = require("./RoomModel");

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    require: true,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
});
User.hasMany(Message, { foreignKey: "fromId" });
Message.belongsTo(User, { as: "sender", foreignKey: "fromId" });

User.hasMany(Message, { foreignKey: "toId" });
Message.belongsTo(User, { as: "receiver", foreignKey: "toId" });

Room.hasMany(Message, { foreignKey: "roomId" });
Message.belongsTo(Room, { foreignKey: "roomId" });

//Message.sync({ force: true });
module.exports = Message;
