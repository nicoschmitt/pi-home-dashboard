(function(){

    module.exports.start = function(app) {
        var server = {};
        var port = process.env.PORT || 8080;
        var http = require('http');
        server = http.createServer(app);
    
        server.listen(port, process.env.IP || "0.0.0.0", function() {
            var addr = server.address();
            console.log("Server listening at ", addr.address + ":" + addr.port);
        });    
    }

}());
