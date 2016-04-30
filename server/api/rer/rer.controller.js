(function(){

    var request = require("request");
    var qs = require("querystring");
    
    module.exports.gettrafic = function(req, res) {
        var ligne = req.params.ligne;
       
        res.json({});
    }
    
    module.exports.prochaintrains = function(req, res) {
        var gare = req.params.gare;
        var jar = request.jar();
        // jar.setCookie(request.cookie("station=" + gare), "http://monrer.fr");
        // var options = {
        //     url: "http://monrer.fr/json?s=" + gare,
        //     jar: jar,
        //     headers: {
        //         Referer: "http://monrer.fr/?s=" + gare
        //     }
        // };
        // request.get(options, function(err, response, body) {
        //     var data = JSON.parse(body);
        //     console.log(data);
        //     res.json(data);
        // });
        res.json({});
    }
  
}());
