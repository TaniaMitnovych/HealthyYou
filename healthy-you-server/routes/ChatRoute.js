const router = require("express").Router();
const Chat = require("../controllers/ChatController");

router.get("/", Chat.getRoom);
router.get("/:id", Chat.getMessages);

module.exports = router;
