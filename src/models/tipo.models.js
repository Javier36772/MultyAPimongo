const mongoose = require('mongoose');

const tipoSchema = mongoose.Schema({

    SteamKey: {
        type: String,
        required: true,
    },
    Cuenta: {
        type: String,
        required: true,
    }
    
    
});

module.exports = mongoose.model('tipo', tipoSchema);