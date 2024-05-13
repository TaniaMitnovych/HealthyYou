const nodeMailer = require("nodemailer");

let config = {
  service: "gmail", // your email domain
  auth: {
    user: process.env.EMAIL_ADDRESS, // your email address
    pass: process.env.EMAIL_PASSWORD,
    //pass: "yrio kjgu hgbv feha", // your password
  },
};
let transporter = nodeMailer.createTransport(config);

module.exports = transporter;
