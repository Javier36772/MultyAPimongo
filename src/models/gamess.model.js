const mongoose = require('mongoose');

const gamesSchema = mongoose.Schema({
    Nombre: {
        type: String,
        required: true,
    },
    Cuenta: {
        type: String,
        required: true,
    },
    Precio: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Gamess', gamesSchema);