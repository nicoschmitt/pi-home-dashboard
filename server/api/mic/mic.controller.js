(function(){

    var request = require("request");
    var moment = require("moment");
  
    module.exports.getdata = function(req, res) {
        var mymic = process.env.MYMIC_URL;
        var key = process.env.MYMIC_SECRETKEY;

        var quarter = "";
        var month = moment().month();
        if (month < 3) quarter = "Q3";
        else if (month < 7) quarter = "Q4"; // July is like Q4
        else if (month < 9) quarter = "Q1";
        else quarter = "Q2";

        var url = mymic + "/" + req.params.username + "?quarter=" + quarter + "&key=" + key;
        request.get(url, (err, response, body) => {
             if (err) {
                 console.log(err);
                 return res.status(500).send(err);
             }
             var data = JSON.parse(body);
             
             res.json(data);
        });
    }
  
}());
