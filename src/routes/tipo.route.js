const express = require('express');
const router = express.Router();
const TipoController = require('../controllers/Tipo.controller');
const rateLimit = require("express-rate-limit");

const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 2, 
    message: "Demasiadas peticiones realizadas, intenta despues de 1 hora"
  });

// Ruta para crear un nuevo tipo
router.post('/tipos', TipoController.createTipo);

// Ruta para obtener todos los tipos
router.get('/tipos',accountLimiter, TipoController.getTodo);

// Ruta para obtener un tipo por su ID
router.get('/tipos/:id', TipoController.getPorid);

// Ruta para actualizar un tipo por su ID
router.patch('/tipos/:id', TipoController.actualizar);

// Ruta para eliminar un tipo por su ID
router.delete('/tipos/:id', TipoController.borrar);

module.exports = router;
