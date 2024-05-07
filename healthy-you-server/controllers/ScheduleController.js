const Schedule = require("../models/ScheduleModel");
const Appointment = require("../models/AppointmentModel");

const { Op } = require("sequelize");

async function getSchedule(req, res) {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findAll({
      where: {
        doctorId: {
          [Op.eq]: id,
        },
        from: {
          [Op.gte]: new Date(),
        },
      },
    });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getScheduleWithAppointments(req, res) {
  try {
    const { doctorId, from, to } = req.query;
    const schedule = await Schedule.findAll({
      where: {
        doctorId: {
          [Op.eq]: doctorId,
        },
        from: {
          [Op.gte]: from,
        },
        to: {
          [Op.lte]: to,
        },
      },
    });
    const appointments = await Appointment.findAll({
      where: {
        doctorId: {
          [Op.eq]: doctorId,
        },
        from: {
          [Op.gte]: from,
        },
        to: {
          [Op.lte]: to,
        },
      },
    });
    res.json({ schedule, appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function createSchedule(req, res) {
  try {
    const { from, to, doctorId, appointmentDuration } = req.body;
    const schedule = await Schedule.create({
      from,
      to,
      doctorId,
      appointmentDuration,
    });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  getSchedule,
  getScheduleWithAppointments,
  createSchedule,
};
