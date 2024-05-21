const Role = require("../models/RoleModel");
const User = require("../models/UserModel");
const { cleanUp } = require("../utils/helpers");
const { Op } = require("sequelize");

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

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  try {
    const userdata = cleanUp(req.body);
    console.log(userdata);
    const [updated] = await User.update(userdata, {
      where: { id },
    });
    if (updated) {
      const updatedUser = await User.findOne({
        where: { id },
        include: [Role],
      });
      return res.status(200).json(updatedUser);
    }
    throw new Error("User not found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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

async function getUserByName(req, res) {
  try {
    const { query } = req.query;
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${query}%` } },
          { lastName: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    return res.json(users);
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
  getUserByName,
};
