import RequestsHal from "../js/requestsHal";
import UserSession from "../js/userSession";

const HttpCodes = require("./httpCodes");
const URL_USER =
  window.location.protocol + "//" + window.location.host + "/user";
const INCRIPTION_OK = 0;
const BAD_PASSWORD = 1;
const BAD_LAB = 2;

/**
 * Send to the internal API the personal data of the user in order to register
 * it in the database.
 * @param {string} data The user data in JSON format
 * @returns {boolean} Retrieves true if the transaction hangs out normally,
 * false otherwise
 */
async function sendUser(data) {
  let ret;
  let parsedData = JSON.parse(data);
  if (!(await RequestsHal.checkLabExists(parsedData.labs))) return BAD_LAB;
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
 * Send a request to the internal API in order to change the lab of the user
 * in the database.
 * @param {string} username The user to change is labs.
 * @param {string} labName The new name to set for labs. 
 */
async function updateUserLab(username, labName)
{
  let ret;
  const params = "/" + username;
  let data = JSON.stringify({
    labs: labName
  });
  if (!(await RequestsHal.checkLabExists(labName))) return false;
  await fetch(URL_USER + params, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: data
  }).then(res => {
      ret = res;
    });
  UserSession.updateUser(username, labName)
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
    .catch(function() {
      return null;
    })
    .then(data => {
      ret = data;
    });
  return ret;
}

export default {
  sendUser: sendUser,
  userConnect: userConnect,
  INCRIPTION_OK: INCRIPTION_OK,
  BAD_PASSWORD: BAD_PASSWORD,
  BAD_LAB: BAD_LAB,
  updateUserLab: updateUserLab
};
