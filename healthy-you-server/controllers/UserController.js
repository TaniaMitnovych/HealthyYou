const Role = require("../models/RoleModel");
const User = require("../models/UserModel");

// Controller for creating a new user
async function createUser(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      roleId,
      birthDate,
      sex,
      phone,
    } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      roleId,
      birthDate,
      sex,
      phone,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Controller for fetching all users
async function getUsers(req, res) {
  try {
    const users = await User.findAll({
      include: Role,
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controller for fetching a single user by id
async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controller for updating a user by id
async function updateUser(req, res) {
  const { id } = req.params;
  try {
    const [updated] = await User.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      return res.status(200).json(updatedUser);
    }
    throw new Error("User not found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controller for deleting a user by id
async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("User not found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
