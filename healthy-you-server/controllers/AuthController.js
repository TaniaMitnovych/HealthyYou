const User = require("../models/UserModel");
const Role = require("../models/RoleModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");
const Doctor = require("../models/DoctorModel");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    const usersRole = await Role.findOne({ where: { title: role } });
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      roleId: usersRole.id,
    });
    if (usersRole.title === "doctor") {
      const doctor = await Doctor.create({ userId: user.id });
    }
    const newUser = await User.findOne({
      where: { id: user.id },
      include: [Role],
    });
    const token = createSecretToken(user.id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ user: newUser });
    next();
  } catch (error) {
    console.error(error);
  }
};
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ where: { email }, include: [Role] });
    if (!user) {
      return res.status(401).json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user.id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(200)
      .json({ message: "User logged in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};
