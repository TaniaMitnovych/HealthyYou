const Schedule = require("../models/ScheduleModel");
const Appointment = require("../models/AppointmentModel");

const { Op } = require("sequelize");
const newAppointmentLetter = require("../letters/newAppointmentLetter");
const User = require("../models/UserModel");
const Doctor = require("../models/DoctorModel");
const appointmentReminder = require("../letters/appointmentReminder");

async function getPatientsAppointments(req, res) {
  try {
    const { id } = req.params;
    const appointments = await Appointment.findAll({
      where: {
        patientId: {
          [Op.eq]: id,
        },
      },
      include: {
        model: Doctor,
        include: [User],
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
      include: [User],
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
    if (appointment) {
      const patient = await User.findOne({ where: { id: patientId } });
      const doctor = await Doctor.findOne({
        where: { id: doctorId },
        include: [User],
      });
      newAppointmentLetter(doctor.User, patient, from);
      appointmentReminder(doctor.User, patient, from);
    }
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
