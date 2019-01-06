// import
import { EsriProvider } from 'leaflet-geosearch';
const allLabUrl = "https://api.archives-ouvertes.fr/search/?fl=*&q=collaboration_s:*"
const collabUrl = "https://api.archives-ouvertes.fr/search/?fl=*&q=collaboration_s:*&fq=labStructName_s:"
// setup
const provider = new EsriProvider();
let labArray = [];

// Retrieve all labs and labs that have collabarate in an array comporting:
// lat,lng and labName
async function fetchAllLabs(){
  await fetch(allLabUrl)
  .then(function(response) {
    return response.json();
  })
  .then(async function(myJson) {
    await labJsonToArray (myJson.response.docs);
  })
  return labArray;
}

async function fetchLabCollab(name)
{
  name = "\""+name+"\"";
  await fetch(collabUrl + name)
  .then(function(response) {
    return response.json();
  })
  .then(async function(myJson) {
    await labJsonToArray (myJson.response.docs);
  })
  return labArray;
}

async function labJsonToArray  (data)
{
  for (let i = 0; i < data.length; ++i)
  {
    if (typeof data[i].labStructAddress_s != 'undefined')
    {
      for (let j = 0; j < data[i].labStructAddress_s.length; ++j)
      {           
        // There also "INCOMING" and "OLD"
        if (data[i].labStructValid_s[j] == "VALID")
        {
          // search
          let results = await provider.search({ query: data[i].labStructAddress_s [j]});
          if (typeof results[0] != 'undefined')
          {
            labArray.push([results[0].y, results[0].x, data[i].labStructName_s [j]]);
          }
        }
      }
    }
  }
}
export default {
  fetchAllLabs: fetchAllLabs,
  fetchLabCollab: fetchLabCollab
}