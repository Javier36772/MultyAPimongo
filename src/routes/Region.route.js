const express = require('express');
const router = express.Router();
const RegionController = require('../controllers/Region.controller');
const rateLimit = require("express-rate-limit");

const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 2, 
    message: "Demasiadas peticiones realizadas, intenta despues de 1 hora"
  });


// Ruta para crear una nueva región
router.post('/regions', RegionController.crearRegion);

// Ruta para obtener todas las regiones
router.get('/regions',accountLimiter, RegionController.getTodo);

// Ruta para obtener una región por su ID
router.get('/regions/:id', RegionController.getPorid);

// Ruta para actualizar una región por su ID
router.patch('/regions/:id', RegionController.actualizar);

// Ruta para eliminar una región por su ID
router.delete('/regions/:id', RegionController.borrar);

module.exports = router;
