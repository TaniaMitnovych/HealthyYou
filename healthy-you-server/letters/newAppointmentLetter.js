const { sendMail } = require("../utils/mail");
const dayjs = require("dayjs");

function newAppointmentLetter(doctor, patient, fromTime) {
  let patientMessage = {
    from: "healthy.you.mailer@gmail.com", // sender address
    //to: patient.email, // list of receivers
    to: "tetiana.mitnovych.pz.2020@lpnu.ua",
    subject: "New appointment planed", // Subject line
    html: `<div>You have new appointment planed</div>
    <div>Doctor: ${doctor.firstName} ${doctor.lastName}</div>
    <div>Date and time: ${dayjs(fromTime).format(
      "HH:mm, dddd, DD MMMM, YYYY"
    )}</div>`,
  };
  let doctorMessage = {
    from: "healthy.you.mailer@gmail.com", // sender address
    //to: doctor.email, // list of receivers
    to: "tetiana.mitnovych.pz.2020@lpnu.ua",
    subject: "New appointment planed", // Subject line
    html: `<div>You have new appointment planed</div>
    <div>Patient: ${patient.firstName} ${patient.lastName}</div>
    <div>Date and time: ${dayjs(fromTime).format(
      "HH:mm, dddd, DD MMMM, YYYY"
    )}</div>`, // html body
  };
  console.log(fromTime);
  sendMail(patientMessage);
  sendMail(doctorMessage);
}
module.exports = newAppointmentLetter;
