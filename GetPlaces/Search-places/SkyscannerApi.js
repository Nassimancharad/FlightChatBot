const config = require('../config');
const axios = require('axios');
var Apintent = '';

function searchPlaces(location,intent){
     Apintent = intent;
return PlacesApiCall(location).then(response => 
    apiResultToCarousselle(response.data)
    );
}

   function PlacesApiCall(location){
   return  axios.get('https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/',{
   headers: {"X-RapidAPI-Key" : config.SKYSCANNER_TOKEN }, 
   params: {
      query: location
    }
  });
  }

    function apiResultToCarousselle(results) {
        if (Apintent == 'Origin'){
            const locationMem = results.Places[0]['PlaceId'];
            return {conversation : {
                language: 'en',
                memory : {
                   Orig : locationMem
                }
            }
        
        }
    }else {
        const locationMem = results.Places[0]['PlaceId'];
        return {conversation : {
            language: 'en',
            memory : {
               Dest : locationMem
            }
        }

    }
      
    }
}
       module.exports = {
        searchPlaces,
       };