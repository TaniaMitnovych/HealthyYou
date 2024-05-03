const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Doctor = require("./DoctorModel");

const Schedule = sequelize.define(
  "Schedule",
  {
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
    appointmentDuration: {
      type: DataTypes.INTEGER,
      defaultValue: 15,
    },
  },
  {
    freezeTableName: true,
  }
);

Doctor.hasMany(Schedule, {
  foreignKey: { name: "doctorId", allowNull: false },
});
Schedule.belongsTo(Doctor, {
  foreignKey: { name: "doctorId", allowNull: false },
});

module.exports = Schedule;
