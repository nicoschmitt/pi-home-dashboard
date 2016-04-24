(function(){

    var request = require("request");
    var qs = require("querystring");
    
    function nice(route) {
        var chemin = route.response;
        var cout = chemin.results.reduce((prev, current) => {
            prev.time += current.crossTime;
            prev.dist += current.length;
            return prev;
        }  , { time: 0, dist: 0 });
        
        return {
            name: chemin.routeName,
            time: cout.time,
            dist: cout.dist
        };
    }
  
    module.exports.gettravel = function(req, res) {
        var from = "105 Rue de Séquigny, Sainte-Geneviève-des-Bois, France";
        var to = "Microsoft France, Quai du Président Roosevelt, Issy-les-Moulineaux, France";
        
        var form = {
            "from"              : "x:2.32624 y:48.64574959999999",
            "to"                : "x:2.2630059719085693 y:48.83225631713867",
            "at"                : 0,
            "returnJSON"        : "true",
            "returnGeometries"  : "true",
            "returnInstructions": "true",
            "timeout"           : 60000,
            "nPaths"            : 3,
            "clientVersion"     : "4.0.0",
            "options"           : "AVOID_TRAILS:t,ALLOW_UTURNS:t"
        };
        
        var url = "https://www.waze.com/row-RoutingManager/routingRequest?" + qs.stringify(form);
        
        var options = {
            url: url,
            headers: {
                'Accept-Language': 'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.22 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                
            }
        };
        
        request.get(options, (err, response, body) => {
             if (err) return res.status(500).send(err);
             if (response.statusCode != 200) return res.status(500).send(body);
             
             var data = JSON.parse(body);
             
             if (data.alternatives && data.alternatives.length > 0) {
                 var result = data.alternatives.map(nice);
                 res.json(result);
             }
             
        });
    }
  
}());
