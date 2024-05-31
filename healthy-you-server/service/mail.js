const nodeMailer = require("nodemailer");

let config = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
};
let transporter = nodeMailer.createTransport(config);

module.exports = transporter;
