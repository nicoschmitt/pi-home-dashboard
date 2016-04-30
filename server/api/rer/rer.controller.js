(function(){

    var request = require("request");
    var xml2js = require('xml2js');
    var moment = require('moment');
    
    module.exports.gettrafic = function(req, res) {
        var ligne = req.params.ligne;
       
        res.json({});
    }
    
    module.exports.prochaintrains = function(req, res) {
        var depart = req.params.depart;
        var arrivee = req.params.arrivee;
        
        if (!depart || !arrivee) return res.status(400).send("invalid parameters.");

        var options = {
            url: "http://api.transilien.com/gare/" + depart + "/depart/" + arrivee,
            auth: {
                user: process.env.SNCF_API_USER,
                password: process.env.SNCF_API_PASS,
                sendImmediately: true
            },
            headers: {
                Accept: 'application/vnd.sncf.transilien.od.depart+json;vers=1'
            }
        };
        request.get(options, function(err, response, body) {
            var data = xml2js.parseString(body, { mergeAttrs: true }, function(err, result) {
                if (result.passages && result.passages.train) {
                    data = result.passages.train.slice(0, 5).map(t => {
                        var date = moment(t.date[0]["_"], "DD/MM/YYYY HH:mm");
                        return { mission: t.miss[0], date: date };
                    });
                    res.json(data);
                } else {
                    res.json([]);
                } 
            });
        });
    }
  
}());
