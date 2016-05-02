(function(){
    var moment  = require("moment");
    var _       = require("lodash");
    var Config  = require("./config.model");

    function getDefaultConfig() {
        return { 
            instance: process.env.INSTANCE,
            env: process.env.NODE_ENV,
            googleKey: process.env.GOOGLE_KEY,
            weather: {
                location: {
                    latitude: 48.856614, 
                    longitude: 2.35222
                }
            },
            mic: {
                username: ""
            },
            travelTime: {
                from: {
                    latitude: 48.856614,
                    longitude: 2.35222
                },
                to: {
                    latitude: 48.832256, 
                    longitude: 2.2630059719085693
                }
            },
            rer: {
                depart: "87545210",
                arrivee: "87328328"
            }
        };
    }

    module.exports.getconfig = function(req, res) {
        Config.findOne({ instance: process.env.INSTANCE }, { __v: 0, _id: 0 }).lean().exec(function(err, doc) {
            if (err) return res.status(500).send(err);
            
            var defaultSettings = getDefaultConfig();
            doc = _.defaultsDeep(doc, defaultSettings);
            
            res.json(doc);
        });  
    };
  
    module.exports.updateconfig = function(req, res) {
        var config = {
            weather: req.body.weather,
            travelTime: req.body.travelTime,
            mic: req.body.mic,
            rer: req.body.rer 
        };
        
        var opt = { upsert: true, setDefaultsOnInsert: true };
        Config.findOneAndUpdate({ instance: req.body.instance }, config, opt, function(err, doc) {
            if (err) return res.status(500).send(err);
            res.json({}); 
        });
    };
}());
