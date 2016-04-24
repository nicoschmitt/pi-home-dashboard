(function(){

    var request = require("request");
  
    module.exports.getweather = function(req, res) {
        var apikey = process.env.FORECAST_IO_KEY;
        var location = req.params.location;
        
        var url = "https://api.forecast.io/forecast/" + apikey + "/" + location + "?units=ca&lang=fr";
        request.get(url, (err, response, body) => {
             if (err) return res.status(500).send(err);
             var data = JSON.parse(body);
             
             var nextHours = data.hourly.data.slice(0, 10).map(elt => { return { time: elt.time * 1000, temp: elt.temperature } });
             
             res.json({
                 currently: {
                    icon: data.currently.icon,
                    summary: data.currently.summary,
                    temp: Math.round(data.currently.temperature),
                 },
                 day: {
                    icon: data.hourly.icon,
                    summary: data.hourly.summary,
                    data: nextHours
                 },
                 week: {
                    icon: data.daily.icon,
                    summary: data.daily.summary
                 }
             });
        });
    }
  
}());
