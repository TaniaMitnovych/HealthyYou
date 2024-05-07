const router = require("express").Router();
const Chat = require("../controllers/ChatController");

router.get("/", Chat.getRoom);
router.get("/:id", Chat.getMessages);
router.get("/list/:id", Chat.getRooms);
router.post("/", Chat.createRoom);

module.exports = router;
