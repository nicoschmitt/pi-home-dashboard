(function(){

    var request = require("request");
  
    module.exports.getdata = function(req, res) {
        var mymic = process.env.MYMIC_URL;
        var key = process.env.MYMIC_SECRETKEY;
        var url = mymic + "/api/data/" + req.params.username + "?key=" + key;
        
        request.get(url, (err, response, body) => {
             if (err) return res.status(500).send(err);
             var data = JSON.parse(body);
             
             res.json(data);
        });
    }
  
}());
