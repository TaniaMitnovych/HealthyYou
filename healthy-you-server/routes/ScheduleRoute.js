const router = require("express").Router();
const Schedule = require("../controllers/ScheduleController");

router.get("/:id", Schedule.getSchedule);
router.get("/", Schedule.getScheduleWithAppointments);
router.post("/", Schedule.createSchedule);

module.exports = router;
