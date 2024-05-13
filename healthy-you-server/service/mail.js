const transporter = require("../util/mail");

function sendMail(message) {
  transporter.sendMail(message).catch((err) => {
    console.error(err);
  });
}

module.exports = { sendMail };
