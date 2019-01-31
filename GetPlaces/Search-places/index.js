const config = require('../config');
const { searchPlaces} = require('./SkyscannerApi.js');


function loadPlaces(app) {
    app.post('/search-places', function(req, res) {
      console.log('[GET] /search-places');

     const conversation = req.body.Conversation
     const intent = conversation.Intent;
     const location = conversation.Location;

      return searchPlaces(location,intent)
      .then(function(carouselle) {
        res.json({
          replies: carouselle,
          conversation: {
          }
        });
      })
      .catch(function(err) {
        console.error('SkyscannerApi::searchFlights error: ', err);
      });
  });
}

module.exports = loadPlaces;