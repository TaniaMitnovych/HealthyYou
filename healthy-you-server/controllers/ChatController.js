const { Op } = require("sequelize");
const Message = require("../models/MessageModel");
const Room = require("../models/RoomModel");

async function getRoom(req, res) {
  try {
    console.log(req.query, "QUERY");
    const { currentUserId, userId } = req.query;
    console.log(currentUserId, userId);
    let room = await Room.findOne({
      where: {
        userIds: {
          [Op.contains]: [currentUserId, userId],
        },
      },
    });
    console.log(room);
    if (!room) {
      console.log("CAAAAAAAAAAAAAAAAAAAAAA");
      room = await Room.create({ userIds: [currentUserId, userId] });
    }
    return res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getMessages(req, res) {
  try {
    const { id } = req.params;
    //console.log(roomId);
    const messages = await Message.findAll({
      where: {
        roomId: {
          [Op.eq]: id,
        },
      },
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createMessage(req, res) {
  try {
    const { text, roomId, fromId, toId } = req.body;
    const message = await Message.create({ text, roomId, fromId, toId });
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getRoom,
  getMessages,
  createMessage,
};
