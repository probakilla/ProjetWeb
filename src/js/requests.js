const HttpCodes = require("./httpCodes");
const URL_USER = "http://localhost:4444/user";

const INCRIPTION_OK = 0;
const BAD_PASSWORD = 1;
const BAD_LAB = 2;

function checkLabExists(lab) {
  return false;
}

/**
 * Send to the internal API the personal data of the user in order to register
 * it in the database.
 * @param {string} data The user data in JSON format
 * @returns {boolean} Retrieves true if the transaction hangs out normally,
 * false otherwise
 */
async function sendUser(data) {
  let ret;
  if (!checkLabExists(data.labs))
    return BAD_LAB;
  await fetch(URL_USER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: data
  })
    .then(res => {
      if (res.status === HttpCodes.CREATED) {
        return INCRIPTION_OK;
      } else if (res.status === HttpCodes.BAD_REQUEST) {
        return BAD_PASSWORD;
      }
    })
    .then(res => {
      ret = res;
    });
  return ret;
}

/**
 * Send a request to the internal API in order to check if a user exists and if
 * its password is correct.
 * @param {string} params The URI arguments of the GET request. The format must
 * be like this: '/username&password'
 * @returns {Object, null} Retrieves null if the transaction with the database
 * hangs out abnormally (if the username does not exists or if the password is
 * incorrect) otherwise, retrives the user json object (without password).
 */
async function userConnect(params) {
  let ret;
  await fetch(URL_USER + params)
    .then(res => {
      if (res.status === HttpCodes.ACCEPTED) {
        return res.json();
      } else {
        return null;
      }
    })
    .then(data => {
      ret = data;
    });
  return ret;
}

module.exports.sendUser = sendUser;
module.exports.userConnect = userConnect;
module.exports.INCRIPTION_OK = INCRIPTION_OK;
module.exports.BAD_PASSWORD = BAD_PASSWORD;
module.exports.BAD_LAB = BAD_LAB;
