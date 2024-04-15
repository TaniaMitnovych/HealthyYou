const Specialty = require("../models/SpecialtyModel");

async function createSpecialty(req, res) {
  try {
    const { title } = req.body;
    const specialty = await Specialty.create({ title });
    res.status(200).json(specialty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getSpecialties(req, res) {
  try {
    const specialties = await Specialty.findAll();
    res.status(200).json(specialties);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createSpecialty,
  getSpecialties,
};
