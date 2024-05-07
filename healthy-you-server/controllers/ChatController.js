const { Op, Sequelize } = require("sequelize");
const { QueryTypes } = require("sequelize");
const Message = require("../models/MessageModel");
const Room = require("../models/RoomModel");
const User = require("../models/UserModel");
const sequelize = require("../db");
const RoomUsers = require("../models/RoomUsersModel");

async function getRoom(req, res) {
  try {
    const { currentUserId, userId } = req.query;
    const room = await sequelize.query(
      `SELECT f."UserId", s."UserId", f."RoomId", q."firstName", q."lastName"
    FROM public."RoomUsers" f
    inner join "RoomUsers" s on f."RoomId" = s."RoomId"
    inner join "Users" u on f."UserId" = u."id"
    inner join "Users" q on s."UserId" = q."id"
    where f."UserId" != s."UserId" and
    f."UserId" = '${currentUserId}'
    and s."UserId" = '${userId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function createRoom(req, res) {
  try {
    const { currentUserId, userId } = req.body;
    let room = await Room.create({});
    await RoomUsers.bulkCreate([
      { RoomId: room.id, UserId: userId },
      { RoomId: room.id, UserId: currentUserId },
    ]);
    room = await sequelize.query(
      `SELECT f."UserId", s."UserId", f."RoomId", q."firstName", q."lastName"
    FROM public."RoomUsers" f
    inner join "RoomUsers" s on f."RoomId" = s."RoomId"
    inner join "Users" u on f."UserId" = u."id"
    inner join "Users" q on s."UserId" = q."id"
    where f."UserId" != s."UserId" and
    f."UserId" = '${currentUserId}'
    and s."UserId" = '${userId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.json(room);
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

async function getRooms(req, res) {
  try {
    const { id } = req.params;
    const rooms = await sequelize.query(
      `SELECT f."UserId", s."UserId", f."RoomId", q."firstName", q."lastName"
      FROM public."RoomUsers" f
      inner join "RoomUsers" s on f."RoomId" = s."RoomId"
      inner join "Users" q on s."UserId" = q."id"
      where f."UserId" != s."UserId" and
      f."UserId" = '${id}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getRoom,
  createRoom,
  getMessages,
  createMessage,
  getRooms,
};
