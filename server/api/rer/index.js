(function(){
    var express = require('express');
    var router = express.Router();

    var controller = require('./rer.controller');
    
    router.get("/trafic/:ligne", controller.gettrafic);
    router.get("/trains/:gare", controller.prochaintrains);

    module.exports = router;
    
}());
