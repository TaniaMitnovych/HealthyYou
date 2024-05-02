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
// const { MONGO_URL, PORT } = process.env;
//const db = require("./db");
const sequelize = require("./db");
const User = require("./models/UserModel");
const Specialty = require("./models/SpecialtyModel");
const { Server } = require("socket.io");
const Message = require("./models/MessageModel");
const { addMessage } = require("./service/chat");
const authSocketMiddleware = require("./middlewares/AuthSocketMiddleware");
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
    methods: ["GET", "POST"],
  },
});
io.use((socket, next) => {
  authSocketMiddleware(socket, next);
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
  })
  .catch((e) => console.log("Connection error: ", e));

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data) => {
    const { roomId } = data; // Data sent from client when join_room event emitted
    socket.join(roomId); // Join the user to a socket room
    console.log("User joined");
    socket.on("send_message", (data) => {
      console.log(data);
      addMessage(data);
      io.in(roomId).emit("receive_message", data);
    });
    socket.on("leave_room", (data) => {
      const { roomId } = data;
      socket.leave(roomId);
    });
  });

  // We can write our socket event listeners in here...
});

app.use(cookieParser());
app.use(express.json());
//app.use("/doctors", doctorsRoute);
app.use("/user", userRoute);
app.use("/roles", roleRoute);
app.use("/doctor", doctorRoute);
app.use("/specialties", specialtiesRoute);
app.use("/chat", chatRoute);
app.use("/", authRoute);
