const { sendMail } = require("../utils/mail");
const dayjs = require("dayjs");
const cron = require("node-cron");
const { getCronOptionString } = require("../utils/helpers");

function appointmentReminder(doctor, patient, fromTime) {
  let patientMessage = {
    from: "healthy.you.mailer@gmail.com",
    to: patient.email,
    subject: "Appointment reminder",
    html: `<div>Do not forget about your appointment</div>
    <div>Doctor: ${doctor.firstName} ${doctor.lastName}</div>
    <div>Date and time: ${dayjs(fromTime).format(
      "HH:mm, dddd, DD MMMM, YYYY"
    )}</div>`,
  };
  let doctorMessage = {
    from: "healthy.you.mailer@gmail.com",
    to: doctor.email,
    subject: "Appointment reminder",
    html: `<div>Do not forget about your appointment</div>
    <div>Patient: ${patient.firstName} ${patient.lastName}</div>
    <div>Date and time: ${dayjs(fromTime).format(
      "HH:mm, dddd, DD MMMM, YYYY"
    )}</div>`,
  };
  const remiderDateTime = dayjs(fromTime).subtract(1, "day").toISOString();
  const options = getCronOptionString(remiderDateTime);
  cron.schedule(options, () => {
    sendMail(patientMessage);
    sendMail(doctorMessage);
  });
}
module.exports = appointmentReminder;
