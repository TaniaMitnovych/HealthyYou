const router = require("express").Router();
const Appointment = require("../controllers/AppointmentsController");

router.get("/doctor/:id", Appointment.getDoctorsAppointments);
router.get("/patient/:id", Appointment.getPatientsAppointments);
router.post("/", Appointment.createAppointment);
router.delete("/:id", Appointment.deleteAppointment);

module.exports = router;
