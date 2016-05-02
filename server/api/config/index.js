(function(){
    
    var express = require('express');
    var router = express.Router();

    var controller = require('./config.controller');
    
    router.get("/", controller.getconfig);
    router.post("/", controller.updateconfig);

    module.exports = router;
}());
