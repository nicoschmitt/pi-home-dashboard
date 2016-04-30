(function(){
    
    var register = function(app) {
        app.use("/api*", function(req, res, next) {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            next(); 
        });
        
        app.use('/api/config', require('./api/config'));
        app.use('/api/data', require('./api/data'));
        app.use("/api/weather", require("./api/weather"));
        app.use("/api/mic", require("./api/mic"));
        app.use("/api/travel", require("./api/travel"));
        app.use("/api/rer", require("./api/rer"));
    };

    module.exports.register = register;

}());
