// import
import { OpenStreetMapProvider } from 'leaflet-geosearch';
const collabUrl = "https://api.archives-ouvertes.fr/search/?q=collaboration_s:*&fl=*"
// setup
const provider = new OpenStreetMapProvider();
let array = [];

fetch(collabUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    dispCollabAddress (myJson.response.docs);
  });

async function dispCollabAddress (data)
  {
    let tmp = 0
    console.log(data.length)
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
            console.log(data[i].labStructAddress_s [j]);
            if (typeof results[0] == 'undefined')
            {
              let res = data[i].labStructAddress_s [j].split("-");
              console.log(res);
              for (let k = 0; k < res.length; ++k)
              {
                results = await provider.search({ query: res[k]});
                console.log(res[k])
                if (typeof results[0] != 'undefined')
                {
                  tmp +=1;
                  console.log(results[0].x, results[0].y);
                  array.push([results[0].x, results[0].y])
                  break;
                } 
              }  
            }
            else
            {
              if (typeof results[0] != 'undefined')
              {
                tmp += 1
                console.log(results[0].x, results[0].y)
                array.push([results[0].x, results[0].y])
              }
            }
          }
        }
      }
    }
    console.log(tmp)
  }

  function getArray()
  {
    return array;
  }