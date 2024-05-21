const express = require("express");
const http = require("http");

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
const chatRoute = require("./routes/ChatRoute");
const appointmentRoute = require("./routes/AppointmentRoute");
const scheduleRoute = require("./routes/ScheduleRoute");
// const { MONGO_URL, PORT } = process.env;
//const db = require("./db");
const sequelize = require("./db");
const User = require("./models/UserModel");
const Specialty = require("./models/SpecialtyModel");
const { Server } = require("socket.io");
const Message = require("./models/MessageModel");
const Appointment = require("./models/AppointmentModel");
const Schedule = require("./models/ScheduleModel");
const RoomUsers = require("./models/RoomUsersModel");
const { addMessage } = require("./service/chat");
const authSocketMiddleware = require("./middlewares/AuthSocketMiddleware");
const nodeMailer = require("nodemailer");
const cron = require("node-cron");
// mongoose
//   .connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB is  connected successfully"))
//   .catch((err) => console.error(err));

const server = http.createServer(app);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT || 4000}`);
});
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});
io.use((socket, next) => {
  authSocketMiddleware(socket, next);
});
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to DB");
    sequelize.sync();
    //sequelize.sync({ force: true });
  })
  .catch((e) => console.log("Connection error: ", e));

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    const { roomId } = data;
    console.log("JOINED", roomId);
    socket.join(roomId);
    socket.on("send_message", (data) => {
      addMessage(data);
      io.in(roomId).emit("receive_message", data);
    });
    socket.on("leave_room", (data) => {
      const { roomId } = data;
      console.log("LEFT", roomId);
      socket.leave(roomId);
    });
  });
});

app.post("/email", (req, res) => {
  let message = {
    from: "taniamitnovych15@gmail.com", // sender address
    to: "tetiana.mitnovych.pz.2020@lpnu.ua", // list of receivers
    subject: "Тест розкладу", // Subject line
    html: "<b>Hello world?</b>", // html body
  };
  cron.schedule("1 23 7 5 *", () => {
    transporter
      .sendMail(message)
      .then((info) => {
        return res.status(201).json({
          msg: "Email sent",
          info: info.messageId,
          preview: nodeMailer.getTestMessageUrl(info),
        });
      })
      .catch((err) => {
        return res.status(500).json({ msg: err });
      });
  });
});
app.use(cookieParser());
app.use(express.json());
//app.use("/doctors", doctorsRoute);
app.use("/user", userRoute);
app.use("/roles", roleRoute);
app.use("/doctor", doctorRoute);
app.use("/specialties", specialtiesRoute);
app.use("/chat", chatRoute);
app.use("/appointment", appointmentRoute);
app.use("/schedule", scheduleRoute);
app.use("/", authRoute);
