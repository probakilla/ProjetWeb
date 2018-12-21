const labStructUrl = "https://api.archives-ouvertes.fr/ref/structure?fl=*";

fetch(labStructUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    dispAddress (myJson.response.docs);
  });

function dispAddress (data)
  {
    $("#address").empty ();
    for (let i = 0; i < data.length; ++i)
    {
      if (typeof data [i].parentAddress_s !== 'undefined')
        $("#address").append ("<p>" + data [i].parentAddress_s + "</p>" );
    }
  }
