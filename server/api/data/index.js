(function(){
    var express = require('express');
    var router = express.Router();

    var controller = require('./data.controller');
    
    router.get("/", controller.getcurrentdata);
    router.get('/:user', controller.getdata);
    router.put('/:user', controller.putdata);

    module.exports = router;
    
}());