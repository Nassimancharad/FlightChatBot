
const config = require('../config');
const axios = require('axios');
var location = "ams-sky"; 




function searchFlights(originPlace,destination,departure,ReturnDate) {
  return SkyscannerApiCall(originPlace,destination,departure,ReturnDate).then(response =>
    apiResultToCarousselle(response.data)
  );
}



function SkyscannerApiCall(originPlace,destination,departure,ReturnDate) {
searchPlaces(originPlace);
destinationplace = location;
originPlace = location;
searchPlaces(destination);
outboundpartialdate = departure;
destinationplace = location;

    return axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/NL/EUR/en-US/${originPlace}/${destinationplace}/${outboundpartialdate}`, {
    headers: {"X-RapidAPI-Key" : config.SKYSCANNER_TOKEN },
    params: {
      inboundpartialdate: ReturnDate
      }

    });
  }
  
function apiResultToCarousselle(results) {
 if (results.length === 0) {
    return [
      {
        type: 'quickReplies',
        content: {
          title: 'Sorry, but I could not find any results for your request :(',
          buttons: [{ title: 'Start over', value: 'Start over' }],
        },
      },
    ];
  }

else{

  a =  'Price: '+ results.Quotes[0]['MinPrice'] + " Origin: "+ results.Places[1]['Name'] + " Destination: " + results.Places[0]['Name']
   

  return [
    {
      type: 'text',
      content: "Here's what I found for you!",
    },
    { type: 'text', content: a },
  ];
}
}

module.exports = {
  searchFlights,
};