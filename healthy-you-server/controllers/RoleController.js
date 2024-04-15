const Role = require("../models/RoleModel");

async function createRole(req, res) {
  try {
    const { title } = req.body;
    const createdRole = await Role.create({ title });
    res.status(201).json(createdRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getRoles(req, res) {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createRole,
  getRoles,
};
