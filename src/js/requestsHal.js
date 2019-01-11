// import
import { EsriProvider } from "leaflet-geosearch";
import { isNull } from "util";
import UserSession from "./userSession";

const nbRespPerReq = 30;
const collabUrl =
  "https://api.archives-ouvertes.fr/search/?fl=*&q=collaboration_s:*&sort=releasedDateY_i asc&rows=" +
  nbRespPerReq;
const checkLabExistsUrl =
  "https://api.archives-ouvertes.fr/search/?fl=*&rows=1";
const provider = new EsriProvider();
let labArray = [];
let collabInfoArray = [];

/**
 * Send a request to the external Hal API in order to get laboratories that have
 * collaborate with the given one.
 * @param {string} name The name of the laboratory to get its collaborations.
 * @returns {Array[]} Retrieves an array that contains the lab's coordinates,
 * the lab's name for each collaborations and collaborators.
 */
async function fetchLabCollab(name) {
  let reqName = '&fq=labStructName_sci:"' + name + '"';
  await fetch(collabUrl + reqName)
    .then(function(response) {
      return response.json();
    })
    .then(async function(myJson) {
      await labJsonToArray(myJson.response.docs);
    });
  return labArray;
}

async function fetchCollabBetweenLab(labName1, labName2) {
  let reqNames =
    '&fq=labStructName_sci:("' + labName1 + '" "' + labName2 + '")';
  await fetch(collabUrl + reqNames)
    .then(function(response) {
      return response.json();
    })
    .then(async function(myJson) {
      await labJsonToArray(myJson.response.docs);
    });
  return labArray;
}

/**
 * Send a request to the external Hal API in order to get laboratories that have
 * collaborate with the given one, in a given period of time.
 * @param {string} name The name of the laboratory to get its collaborations.
 * @param {string} begin The minimal year to search for a collaboration.
 * @param {string} end The maximal year to search for a collaboration. Its a
 * optionnal parameter and if its not given, it will search with no upper limit.
 * @returns {Array[]} Retrieves an array that contains the lab's coordinates,
 * the lab's name for each collaborations and collaborators.
 */
async function fetchCollabsByDate(name, begin, end = "*") {
  let reqName = '&fq=labStructName_sci:"' + name + '"';
  let date = "&fq=releasedDateY_i:[" + begin + " TO " + end + "]";
  await fetch(collabUrl + reqName + date)
    .then(function(response) {
      return response.json();
    })
    .then(async function(myJson) {
      await labJsonToArray(myJson.response.docs);
    });
  return labArray;
}

/**
 * Send a request to the external Hal API in order to get laboratories that have
 * collaborate with the given one, in a given country.
 * @param {string} name The name of the laboratory to get its collaborations.
 * @param {string} country The country code, for example fr for france.
 * @returns {Array[]} Retrieves an array that contains the lab's coordinates,
 * the lab's name for each collaborations and collaborators.
 */
async function fetchCollabByCountry(name, country) {
  let reqName = '&fq=labStructName_sci:"' + name + '"';
  let reqCountry = "&fq=labStructCountry_s:" + country;
  await fetch(collabUrl + reqName + reqCountry)
    .then(function(response) {
      return response.json();
    })
    .then(async function(myJson) {
      await labJsonToArray(myJson.response.docs, country);
    });
  return labArray;
}

async function checkLabExists(name) {
  let reqName = '&fq=labStructName_sci:"' + name + '"';
  let res;
  await fetch(checkLabExistsUrl + reqName)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      res = myJson.response.docs.length == 0 ? false : true;
    });
  return res;
}

async function labJsonToArray(data, country = null) {
  clearArray(labArray);
  clearArray(collabInfoArray);
  for (let i = 0; i < data.length; ++i) {
    let collabInfo = [];
    if (typeof data[i].labStructAddress_s != "undefined") {
      let collaborators = [];
      collabInfo.push(data[i].title_s, data[i].releasedDateY_i);
      for (let j = 0; j < data[i].labStructAddress_s.length; ++j) {
        // search
        let results = await provider.search({
          query: data[i].labStructAddress_s[j]
        });
        if (
          typeof results[0] != "undefined" &&
          (isNull(country) ||
            (country == data[i].labStructCountry_s[j] ||
              data[i].labStructName_s[j].toUpperCase() ==
                UserSession.getLabs().toUpperCase()))
        ) {
          labArray.push([
            results[0].y,
            results[0].x,
            data[i].labStructName_s[j]
          ]);
          collaborators.push(data[i].labStructName_s[j]);
        }
      }
      collabInfo.push(collaborators);
      collabInfoArray.push(collabInfo);
    }
  }
}

function getCollabInfoArray() {
  return collabInfoArray;
}

function clearArray(array) {
  array.splice(0, array.length);
}

export default {
  fetchLabCollab: fetchLabCollab,
  fetchCollabsByDate: fetchCollabsByDate,
  fetchCollabByCountry: fetchCollabByCountry,
  getCollabInfoArray: getCollabInfoArray,
  checkLabExists: checkLabExists,
  fetchCollabBetweenLab: fetchCollabBetweenLab
};
