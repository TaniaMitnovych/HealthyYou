const dayjs = require("dayjs");

function cleanUp(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] == false) {
      delete obj[key];
    }
  }
  return obj;
}

function getCronOptionString(datetime) {
  const datetimeObj = dayjs(datetime);
  const cronStr = `${datetimeObj.minute()} ${datetimeObj.hour()} ${datetimeObj.date()} ${
    datetimeObj.month() + 1
  } *}`;
  return cronStr;
}
module.exports = { cleanUp, getCronOptionString };
