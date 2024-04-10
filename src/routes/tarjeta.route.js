const express = require('express');
const router = express.Router();
const TarjetaController = require('../controllers/tarjeta.controller');
const rateLimit = require("express-rate-limit");


const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 2, 
    message: "Demasiadas peticiones realizadas, intenta despues de 1 hora"
  });

// Ruta para crear una nueva tarjeta
router.post('/tarjetas', TarjetaController.createTarjeta);

// Ruta para obtener todas las tarjetas
router.get('/tarjetas',accountLimiter, TarjetaController.getTodo);

// Ruta para obtener una tarjeta por su ID
router.get('/tarjetas/:id', TarjetaController.getPorid);

// Ruta para actualizar una tarjeta por su ID
router.patch('/tarjetas/:id', TarjetaController.actualizar);

// Ruta para eliminar una tarjeta por su ID
router.delete('/tarjetas/:id', TarjetaController.borrar);

module.exports = router;
