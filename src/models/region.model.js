const mongoose = require('mongoose');

const regionSchema = mongoose.Schema({
    global: {
        type: String,
        required: true,
    },
    latam: {
        type: String,
        required: true,
    },
    europa: {
        type: String,
        required: true,
    },
    turquia: {
        type: String,
        required: true,
    },
    argen:{
    type:String,
    required: true    
    }  
    
});

module.exports = mongoose.model('region', regionSchema);