// import
import { EsriProvider } from 'leaflet-geosearch';
const collabUrl = "https://api.archives-ouvertes.fr/search/?q=collaboration_s:*&fl=*"
// setup
const provider = new EsriProvider();
let labArray = [];

export default async function fetchAllLabs(){
  await fetch(collabUrl)
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