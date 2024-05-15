const Doctor = require("../models/DoctorModel");
const User = require("../models/UserModel");
const Specialty = require("../models/SpecialtyModel");
const { Op } = require("sequelize");

async function createDoctor(req, res) {
  try {
    const { experience, userId, specialtyId } = req.body;
    const user = await User.findByPk(userId);
    if (user) {
      const doctor = await Doctor.create({ experience, userId, specialtyId });
      res.status(201).json(doctor);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getDoctor(req, res) {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findOne({
      include: {
        model: User,
        where: {
          id: id,
        },
        Specialty,
      },
    });
    if (doctor) {
      return res.status(200).json(doctor);
    }
    res.status(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getAllDoctors(req, res) {
  try {
    const doctors = await Doctor.findAll({
      include: [User, Specialty],
    });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateDoctor(req, res) {
  const { id } = req.params;
  try {
    const [updated] = await Doctor.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedDoctor = await Doctor.findByPk(id);
      return res.json(updatedDoctor);
    }
    throw new Error("Doctor not found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteDoctor(req, res) {
  const { id } = req.params;
  try {
    const deleted = await Doctor.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("Doctor not found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function filterDoctorsBySpecialty(req, res) {
  const { specialtyId } = req.params;
  try {
    const doctors = await Doctor.findAll({
      where: { specialtyId },
      include: [User, Specialty],
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function filterDoctorsByExperience(req, res) {
  const { minExperience, maxExperience } = req.query;
  try {
    const doctors = await Doctor.findAll({
      where: {
        experience: {
          [Op.gte]: minExperience || 0,
          [Op.lte]: maxExperience || 10000,
        },
      },
      include: [User, Specialty],
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function filterDoctorsByName(req, res) {
  const { name } = req.query;
  try {
    const doctors = await Doctor.findAll({
      include: [
        {
          model: User,
          where: {
            [Op.or]: [
              { firstName: { [Op.iLike]: `%${name}%` } },
              { lastName: { [Op.iLike]: `%${name}%` } },
            ],
          },
        },
        Specialty,
      ],
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function filterDoctors(req, res) {
  const { specialtyId, minExperience, maxExperience, name, sex } = req.query;
  try {
    let whereClause = {};

    if (specialtyId) {
      whereClause.specialtyId = specialtyId;
    }

    if (minExperience || maxExperience) {
      whereClause.experience = {};
      if (minExperience) {
        whereClause.experience[Op.gte] = minExperience;
      }
      if (maxExperience) {
        whereClause.experience[Op.lte] = maxExperience;
      }
    }

    let includeClause = [{ model: User }, { model: Specialty }];

    if (name) {
      includeClause[0].where = {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${name}%` } },
          { lastName: { [Op.iLike]: `%${name}%` } },
        ],
      };
    }
    if (sex) {
      includeClause[0].where = {
        ...includeClause[0].where,
        sex: {
          [Op.eq]: sex,
        },
      };
    }

    const doctors = await Doctor.findAll({
      where: whereClause,
      include: includeClause,
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  createDoctor,
  getDoctor,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
  filterDoctorsBySpecialty,
  filterDoctorsByExperience,
  filterDoctorsByName,
  filterDoctors,
};
