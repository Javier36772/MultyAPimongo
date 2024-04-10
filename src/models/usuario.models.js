const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },  
    Password: {
        type: String,
        required: true,
    },
    Usuario: {
        type: Boolean,
        required: true,
    },
    administrador: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
