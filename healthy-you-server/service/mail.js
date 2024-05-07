const structureMailOtion = (transporter) => {
  let mailOption = {
    from: "taniamitnovych15@gmail.com",
    to: "tetiana.mitnovych.pz.2020@lpnu.ua",
    subject: "TEST",
    text: "Yahoooo",
  };
  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(info.messageId);
      console.log(nodeMailer.getTestMessageUrl(info));
    }
  });
};
