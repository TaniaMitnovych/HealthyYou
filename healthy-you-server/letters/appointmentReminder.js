const { sendMail } = require("../service/mail");
const dayjs = require("dayjs");
const cron = require("node-cron");
const { getCronOptionString } = require("../utils/helpers");

function appointmentReminder(doctor, patient, fromTime) {
  let patientMessage = {
    from: "healthy.you.mailer@gmail.com", // sender address
    //to: patient.email, // list of receivers
    to: "tetiana.mitnovych.pz.2020@lpnu.ua",
    subject: "Appointment reminder", // Subject line
    html: `<div>Do not forget about your appointment</div>
    <div>Doctor: ${doctor.firstName} ${doctor.lastName}</div>
    <div>Date and time: ${dayjs(fromTime).format(
      "HH:mm, dddd, DD MMMM, YYYY"
    )}</div>`, // html body
  };
  let doctorMessage = {
    from: "healthy.you.mailer@gmail.com", // sender address
    //to: doctor.email, // list of receivers
    to: "tetiana.mitnovych.pz.2020@lpnu.ua",
    subject: "Appointment reminder", // Subject line
    html: `<div>Do not forget about your appointment</div>
    <div>Patient: ${patient.firstName} ${patient.lastName}</div>
    <div>Date and time: ${dayjs(fromTime).format(
      "HH:mm, dddd, DD MMMM, YYYY"
    )}</div>`, // html body
  };
  const remiderDateTime = dayjs(fromTime).subtract(1, "day").toISOString();
  const options = getCronOptionString(remiderDateTime);
  cron.schedule(options, () => {
    sendMail(patientMessage);
    sendMail(doctorMessage);
  });
}
module.exports = appointmentReminder;
