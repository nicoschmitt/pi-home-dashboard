(function(){

    var request = require("request");
  
    module.exports.getweather = function(req, res) {
        var apikey = process.env.FORECAST_IO_KEY;
        var location = req.params.location;
        
        request.get("https://api.forecast.io/forecast/" + apikey + "/" + location + "?units=ca&lang=fr", (err, response, body) => {
             if (err) return res.status(500).send(err);
             var data = JSON.parse(body);
             res.json({
                 currently: {
                    icon: data.currently.icon,
                    summary: data.currently.summary,
                    temp: Math.round(data.currently.temperature),
                 },
                 day: {
                    icon: data.hourly.icon,
                    summary: data.hourly.summary
                 },
                 week: {
                    icon: data.daily.icon,
                    summary: data.daily.summary
                 }
             });
        });
    }
  
}());
