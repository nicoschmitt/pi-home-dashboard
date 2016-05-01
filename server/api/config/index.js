(function(){
    
    // BFM : 87328328
    // St Genevieve : 87545210

    var express = require('express');
    var router = express.Router();
    
    var getConfig = function(req, res) {
      res.json({ 
          env: process.env.NODE_ENV,
          googleKey: process.env.GOOGLE_KEY,
          weather: {
              location: {
                  long: 48.6373,
                  lat: 2.3638
              }
          },
          mic: {
              username: "nicolass"
          },
          travelTime: {
              from: {
                  long: 48.64575, 
                  lat: 2.32624
              },
              to: {
                  long: 48.832256, 
                  lat: 2.2630059719085693
              }
          },
          rer: {
              depart: "87545210",
              arrivee: "87328328"
          }
      });
    };
    
    router.get('/', getConfig);
    
    module.exports = router;
    
}());
