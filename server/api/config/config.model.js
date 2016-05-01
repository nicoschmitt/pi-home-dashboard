(function(){
    
    var mongoose = require('mongoose');
    var shortid = require("shortid");

    var dataSchema = new mongoose.Schema({ 
        instance: String,
        weather: mongoose.Schema.Types.Mixed,
        travelTime: mongoose.Schema.Types.Mixed,
        rer: mongoose.Schema.Types.Mixed,
        mic: mongoose.Schema.Types.Mixed
    })
        
    var Config = mongoose.model("Config", dataSchema);
    module.exports = Config;
    
}());
