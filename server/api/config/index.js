(function(){

    var express = require('express');
    var router = express.Router();
    
    var getConfig = function(req, res) {
      res.json({ 
          env: process.env.NODE_ENV
      });
    };
    
    router.get('/', getConfig);
    
    module.exports = router;
    
}());
