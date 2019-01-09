// import
import { EsriProvider } from 'leaflet-geosearch';
import { isNull } from 'util';
import UserSession from './userSession';

const nbRespPerReq = 42;
const collabUrl = "https://api.archives-ouvertes.fr/search/?fl=*&q=collaboration_s:*&sort=releasedDateY_i asc&rows="+nbRespPerReq;
const provider = new EsriProvider();
let labArray = [];
let collabInfoArray = [];

// Retrieve lab that collaborate with the lab named "name"
async function fetchLabCollab(name)
{
  let reqName = "&fq=labStructName_t:\"" + name + "\"";
  await fetch(collabUrl + reqName)
  .then(function(response) {
    return response.json();
  })
  .then(async function(myJson) {
    await labJsonToArray (myJson.response.docs);
  })
  return labArray;
}

// Retrieve lab that collaborate with the lab named "name" between
// "begin" and "end". If no value are passed for end, it will search
// at the maximum.
async function fetchCollabsByDate(name, begin, end="*"){
  let reqName = "&fq=labStructName_t:\"" + name + "\"";
  let date = "&fq=releasedDateY_i:[" + begin + " TO " + end + "]";
  await fetch(collabUrl + reqName + date)
  .then(function(response) {
    return response.json();
  })
  .then(async function(myJson) {
    await labJsonToArray (myJson.response.docs);
  })
  return labArray;
}

async function fetchCollabByCountry(name, country)
{
  let reqName = "&fq=labStructName_t:\"" + name + "\"";
  let reqCountry = "&fq=labStructCountry_s:" + country;
  await fetch(collabUrl + reqName + reqCountry)
  .then(function(response) {
    return response.json();
  })
  .then(async function(myJson) {
    await labJsonToArray (myJson.response.docs, country);
  })
  return labArray;
}

async function labJsonToArray  (data, country=null)
{
  clearArray(labArray);
  clearArray(collabInfoArray);
  for (let i = 0; i < data.length; ++i)
  {
    let collabInfo = [];
    if (typeof data[i].labStructAddress_s != 'undefined')
    {
      let collaborators = [];
      collabInfo.push(data[i].title_s, data[i].releasedDateY_i);
      for (let j = 0; j < data[i].labStructAddress_s.length; ++j)
      { 
        // search
        let results = await provider.search({ query: data[i].labStructAddress_s [j]});
        if (typeof results[0] != 'undefined' && (isNull(country) || ((country == data[i].labStructCountry_s[j]) || (data[i].labStructName_s[j].toUpperCase() == UserSession.getLabs().toUpperCase()))))
        {
          labArray.push([results[0].y, results[0].x, data[i].labStructName_s [j], data[i].title_s, data[i].releasedDateY_i]);
          collaborators.push(data[i].labStructName_s [j]);
        }
      }
      collabInfo.push(collaborators);
      collabInfoArray.push(collabInfo);
    }
  }
}

function getCollabInfoArray()
{
  return collabInfoArray;
}

function clearArray(array)
{
  array.splice(0, array.length);
}
export default {
  fetchLabCollab: fetchLabCollab,
  fetchCollabsByDate: fetchCollabsByDate,
  fetchCollabByCountry: fetchCollabByCountry,
  getCollabInfoArray: getCollabInfoArray
}