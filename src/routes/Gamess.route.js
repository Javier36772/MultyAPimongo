const express = require('express');
const router = express.Router();
const GamesController = require('../controllers/Gamess.controller');
const rateLimit = require("express-rate-limit");

const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 2, 
    message: "Demasiadas peticiones realizadas, intenta despues de 1 hora"
  });

router.post('/games', GamesController.crear);

router.get('/games',accountLimiter, GamesController.getTodo);

router.get('/games/:id', GamesController.getPorid);


router.patch('/games/:id', GamesController.actualizar);


router.delete('/games/:id', GamesController.borrar);

module.exports = router;
