const Message = require("../models/MessageModel");

async function addMessage(messageData) {
  try {
    const { text, roomId, fromId, toId } = messageData;
    const message = await Message.create({ text, roomId, fromId, toId });
    return message;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addMessage };
