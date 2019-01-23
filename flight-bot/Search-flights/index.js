const config = require('../config');
const { searchFlights } = require('./SkyscannerApi.js');
const constants = require('./constants');
function loadFlightsRoute(app) {
    app.post('/search-flights', function(req, res) {
      console.log('[GET] /search-flights');
      const destination = req.body.conversation.memory['Destination'];
      const originPlace = req.body.conversation.memory['originplace'];
      const departureMem = req.body.conversation.memory['Departure'];
      const departure = departureMem['iso'].substring(0,10);
      const ReturnDateMem = req.body.conversation.memory['ReturnDate'];
      const ReturnDate = ReturnDateMem['iso'].substring(0,10);


      return searchFlights(originPlace,destination,departure,ReturnDate)
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

module.exports = loadFlightsRoute;