const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// Route for creating a new user
router.post("/", UserController.createUser);

// Route for fetching all users
router.get("/", UserController.getUsers);

// Route for fetching a single user by id
router.get("/:id", UserController.getUserById);

// Route for updating a user by id
router.put("/:id", UserController.updateUser);

// Route for deleting a user by id
router.delete("/:id", UserController.deleteUser);

module.exports = router;
