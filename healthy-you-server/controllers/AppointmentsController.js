const Schedule = require("../models/ScheduleModel");
const Appointment = require("../models/AppointmentModel");

const { Op } = require("sequelize");

async function getPatientsAppointments(req, res) {
  try {
    const { id } = req.params;
    const appointments = await Appointment.findAll({
      where: {
        patientId: {
          [Op.eq]: id,
        },
      },
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getDoctorsAppointments(req, res) {
  try {
    const { id } = req.params;
    const appointments = await Appointment.findAll({
      where: {
        doctorId: {
          [Op.eq]: id,
        },
      },
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createAppointment(req, res) {
  try {
    const { from, to, doctorId, patientId } = req.body;
    const appointment = await Appointment.create({
      from,
      to,
      doctorId,
      patientId,
    });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteAppointment(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Appointment.destroy({
      where: {
        id,
      },
    });
    if (deleted) {
      return res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getPatientsAppointments,
  getDoctorsAppointments,
  createAppointment,
  deleteAppointment,
};
