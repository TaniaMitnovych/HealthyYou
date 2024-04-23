const { Op } = require("sequelize");
const Message = require("../models/MessageModel");
const Room = require("../models/RoomModel");

async function getRoom(req, res) {
  try {
    const { currentUserId, userId } = req.query;

    let room = await Room.findOne({
      where: {
        userIds: {
          [Op.contains]: [currentUserId, userId],
        },
      },
    });
    if (!room) {
      room = await Room.create({ userId: [currentUserId, userId] });
    }
    return res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getMessages(req, res) {
  try {
    const { roomId } = req.params;
    const messages = await Message.findAll({
      where: {
        roomId: {
          [Op.eq]: roomId,
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
