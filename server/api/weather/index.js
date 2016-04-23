(function(){
    var express = require('express');
    var router = express.Router();

    var controller = require('./weather.controller');
    
    router.get("/:location", controller.getweather);

    module.exports = router;
    
}());