const express = require("express");
const router = express.Router();
const SpecialtyController = require("../controllers/SpecialtyController");

router.post("/", SpecialtyController.createSpecialty);
router.get("/", SpecialtyController.getSpecialties);
module.exports = router;
