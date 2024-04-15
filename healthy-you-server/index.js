const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const userRoute = require("./routes/UserRoute");
const roleRoute = require("./routes/RoleRoute");
const doctorRoute = require("./routes/DoctorsRoute");
const specialtiesRoute = require("./routes/SpecialtiesRoute");
// const { MONGO_URL, PORT } = process.env;
//const db = require("./db");
const sequelize = require("./db");
const User = require("./models/UserModel");
const Specialty = require("./models/SpecialtyModel");
// mongoose
//   .connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB is  connected successfully"))
//   .catch((err) => console.error(err));
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT || 4000}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to DB");
    sequelize.sync();
    //sequelize.sync({ force: true });

    // Specialty.bulkCreate([
    //   {
    //     title: "Cardiology",
    //   },
    //   {
    //     title: "Dermatology",
    //   },
    //   {
    //     title: "Endocrinology",
    //   },
    //   {
    //     title: "Gastroenterology",
    //   },
    //   {
    //     title: "Hematology",
    //   },
    //   {
    //     title: "Neurology",
    //   },
    //   {
    //     title: "Oncology",
    //   },
    //   {
    //     title: "Pediatrics",
    //   },
    //   {
    //     title: "Psychiatry",
    //   },
    //   {
    //     title: "Surgery",
    //   },
    // ]);
    // User.create({
    //   firstName: "Jane",
    //   email: "jj@gmail.com",
    //   password: "1111",
    //   lastName: "Brown",
    // });
    // const users = await User.findAll();
    // console.log(users.toJSON());
  })
  .catch((e) => console.log("Connection error: ", e));

app.use(cookieParser());
app.use(express.json());
//app.use("/doctors", doctorsRoute);
app.use("/user", userRoute);
app.use("/roles", roleRoute);
app.use("/doctor", doctorRoute);
app.use("/specialties", specialtiesRoute);
app.use("/", authRoute);
