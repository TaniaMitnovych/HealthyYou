function cleanUp(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] == false) {
      delete obj[key];
    }
  }
  return obj;
}
module.exports = { cleanUp };
