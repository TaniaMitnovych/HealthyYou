const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Doctor = require("./DoctorModel");
const User = require("./UserModel");

const Appointment = sequelize.define("Appointment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  from: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  to: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Doctor.hasMany(Appointment, {
  foreignKey: { name: "doctorId", allowNull: false },
});
Appointment.belongsTo(Doctor, {
  foreignKey: { name: "doctorId", allowNull: false },
});

User.hasMany(Appointment, {
  foreignKey: { name: "patientId", allowNull: false },
});
Appointment.belongsTo(User, {
  foreignKey: { name: "patientId", allowNull: false },
});

module.exports = Appointment;
