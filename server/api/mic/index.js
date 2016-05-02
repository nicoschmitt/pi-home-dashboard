(function(){
    var express = require('express');
    var router = express.Router();

    var controller = require('./mic.controller');
    
    router.get("/:username", controller.getdata);

    module.exports = router;
}());