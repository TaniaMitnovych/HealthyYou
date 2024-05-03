const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./UserModel");
const Specialty = require("./SpecialtyModel");

const Doctor = sequelize.define("Doctor", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  experience: {
    type: DataTypes.INTEGER,
    require: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
});
User.hasOne(Doctor, { foreignKey: { name: "userId", allowNull: false } });
Doctor.belongsTo(User, { foreignKey: { name: "userId", allowNull: false } });

Specialty.hasOne(Doctor, { foreignKey: "specialtyId" });
Doctor.belongsTo(Specialty, { foreignKey: "specialtyId" });

Doctor.sync();
module.exports = Doctor;
