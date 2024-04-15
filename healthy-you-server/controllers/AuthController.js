// const User = require("../models/UserModel");
// const { createSecretToken } = require("../util/SecretToken");
// const bcrypt = require("bcryptjs");

// module.exports.Signup = async (req, res, next) => {
//   try {
//     const { email, password, username, createdAt } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ message: "User already exists" });
//     }
//     const user = await User.create({ email, password, username, createdAt });
//     const token = createSecretToken(user._id);
//     res.cookie("token", token, {
//       withCredentials: true,
//       httpOnly: false,
//     });
//     res.status(201).json();
//     next();
//   } catch (error) {
//     console.error(error);
//   }
// };
// module.exports.Login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.json({ message: "All fields are required" });
//     }
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({ message: "Incorrect password or email" });
//     }
//     const auth = await bcrypt.compare(password, user.password);
//     if (!auth) {
//       return res.json({ message: "Incorrect password or email" });
//     }
//     const token = createSecretToken(user._id);
//     res.cookie("token", token, {
//       withCredentials: true,
//       httpOnly: false,
//     });
//     res
//       .status(200)
//       .json({ message: "User logged in successfully", success: true });
//     next();
//   } catch (error) {
//     console.error(error);
//   }
// };
const User = require("../models/UserModel");
const Doctor = require("../models/DoctorModel");
const Specialty = require("../models/SpecialtyModel");

module.exports.Users = async (req, res, next) => {
  try {
    const users = await Specialty.findAll();
    if (users.length) {
      return res.status(200).json({ users });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error(error);
  }
};
