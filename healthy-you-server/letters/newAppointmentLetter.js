const { sendMail } = require("../utils/mail");
const dayjs = require("dayjs");

function newAppointmentLetter(doctor, patient, fromTime) {
  let patientMessage = {
    from: "healthy.you.mailer@gmail.com",
    //to: patient.email,
    to: "tetiana.mitnovych.pz.2020@lpnu.ua",
    subject: "New appointment planned",
    html: `<div>You have new appointment planned</div>
    <div>Doctor: ${doctor.firstName} ${doctor.lastName}</div>
    <div>Date and time: ${dayjs(fromTime).format(
      "HH:mm, dddd, DD MMMM, YYYY"
    )}</div>`,
  };
  let doctorMessage = {
    from: "healthy.you.mailer@gmail.com",
    //to: doctor.email,
    to: "tetiana.mitnovych.pz.2020@lpnu.ua",
    subject: "New appointment planned",
    html: `<div>You have new appointment planned</div>
    <div>Patient: ${patient.firstName} ${patient.lastName}</div>
    <div>Date and time: ${dayjs(fromTime).format(
      "HH:mm, dddd, DD MMMM, YYYY"
    )}</div>`,
  };
  sendMail(patientMessage);
  sendMail(doctorMessage);
}
module.exports = newAppointmentLetter;
