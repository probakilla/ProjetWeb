const HttpCodes = require("./httpCodes");
const URL_USER = "http://localhost:4444/user";

async function sendUser(data) {
  let ret;
  await fetch(URL_USER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: data
  }).then(res => {
    if (res.status === HttpCodes.CREATED) {
      ret = true;
    } else if (res.status === HttpCodes.BAD_REQUEST) {
      ret = false;
    }
  });
  return ret;
}

async function userConnect(params) {
  let ret;
  await fetch(URL_USER + params).then(res => {
    if (res.status === HttpCodes.ACCEPTED) {
      ret = true;
    } else {
      ret = false;
    }
  });
  return ret;
}

module.exports.sendUser = sendUser;
module.exports.userConnect = userConnect;
