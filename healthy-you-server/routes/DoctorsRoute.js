const router = require("express").Router();
const Doctor = require("../controllers/DoctorController");

router.post("/", Doctor.createDoctor);
router.get("/:id", Doctor.getDoctor);
router.get("/", Doctor.getAllDoctors);
module.exports = router;
