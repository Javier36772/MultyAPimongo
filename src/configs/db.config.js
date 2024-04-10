const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/games')
.then(() => console.log("conectado a mongodb exitosamente"))
.catch(console.log);
