const express = require("express");
const http = require("http");
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
const sequelize = require("./db");
const { Server } = require("socket.io");
const { addMessage } = require("./service/chat");
const authSocketMiddleware = require("./middlewares/AuthSocketMiddleware");
const path = require("path");

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
  })
  .catch((e) => console.log("Connection error: ", e));

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    const { roomId } = data;
    socket.join(roomId);
    socket.on("send_message", (data) => {
      addMessage(data);
      io.in(roomId).emit("receive_message", data);
    });
    socket.on("leave_room", (data) => {
      const { roomId } = data;
      socket.leave(roomId);
    });
  });
});
const dirname = path.dirname("");
const buildPath = path.join(dirname, "../healthy-you/build");
app.use(express.static(buildPath));
app.get("/", function (req, res) {
  res.sendFile(
    path.join(dirname, "../healthy-you/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});
app.use(cookieParser());
app.use(express.json());
app.use("/user", userRoute);
app.use("/roles", roleRoute);
app.use("/doctor", doctorRoute);
app.use("/specialties", specialtiesRoute);
app.use("/chat", chatRoute);
app.use("/appointment", appointmentRoute);
app.use("/schedule", scheduleRoute);
app.use("/", authRoute);
