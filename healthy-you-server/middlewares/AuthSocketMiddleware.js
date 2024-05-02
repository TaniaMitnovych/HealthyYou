const jwt = require("jsonwebtoken");

const authSocketMiddleware = (socket, next) => {
  const token = socket.handshake.query?.token;
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decoded);
    socket.user = decoded;
  } catch (err) {
    return next(new Error("NOT AUTHORIZED"));
  }
  next();
};

module.exports = authSocketMiddleware;
