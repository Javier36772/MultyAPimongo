const mongoose = require('mongoose');

const tarjetaSchema = mongoose.Schema({
    NumTarjeta: {
        type: Number,
        required: true,
    },
    Fecha: {
        type: Date,
        required: true,
    },

    Cvv:{
        type: Number,
        required: true,
    },

    Titular:{
    type:String,
    required: true    
    }  
    
});

module.exports = mongoose.model('tarjeta', tarjetaSchema);