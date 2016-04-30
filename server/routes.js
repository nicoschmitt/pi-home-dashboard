(function(){
    
    var register = function(app) {
        app.use('/api/config', require('./api/config'));
        app.use('/api/data', require('./api/data'));
        app.use("/api/weather", require("./api/weather"));
        app.use("/api/mic", require("./api/mic"));
        app.use("/api/travel", require("./api/travel"));
        app.use("/api/rer", require("./api/rer"));
    };

    module.exports.register = register;

}());
