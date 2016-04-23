(function(){
    
    var register = function(app) {
        app.use('/api/config', require('./api/config'));
        app.use('/api/data', require('./api/data'));
        app.use("/api/weather", require("./api/weather"));
    };

    module.exports.register = register;

}());
