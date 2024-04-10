const Games = require('../models/gamess.model');

// Endpoint para crear un nuevo juego
exports.crear = async (req, res) => {
  try {
    const game = new Games(req.body); // Crea una nueva instancia del modelo Games con los datos proporcionados en el cuerpo de la solicitud
    await game.save(); // Guarda el juego en la base de datos
    res.status(201).send(game); // Responde con el juego creado y un código de estado 201 (creado satisfactoriamente)
  } catch (error) {
    res.status(400).send(error); // Si ocurre un error, responde con un código de estado 400 (solicitud incorrecta) y el mensaje de error
  }
};

// Endpoint para obtener todos los juegos
exports.getTodo = async (req, res) => {
  try {
    const games = await Games.find(); // Busca todos los juegos en la base de datos
    res.send(games); // Responde con los juegos encontrados
  } catch (error) {
    res.status(500).send(error); // Si ocurre un error, responde con un código de estado 500 (error interno del servidor) y el mensaje de error
  }
};

// Endpoint para obtener un juego por su ID
exports.getPorid = async (req, res) => {
  try {
    const game = await Games.findById(req.params.id); // Busca un juego por su ID en la base de datos
    if (!game) {
      return res.status(404).send(); // Si no se encuentra el juego, responde con un código de estado 404 (no encontrado)
    }
    res.send(game); // Responde con el juego encontrado
  } catch (error) {
    res.status(500).send(error); // Si ocurre un error, responde con un código de estado 500 (error interno del servidor) y el mensaje de error
  }
};

// Endpoint para actualizar un juego
exports.actualizar = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['Nombre', 'Cuenta', 'Precio'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Error en la solicitud!' }); // Si hay intentos de actualizar campos no permitidos, responde con un código de estado 400 (solicitud incorrecta) y un mensaje de error
  }

  try {
    const game = await Games.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Busca y actualiza un juego por su ID con los datos proporcionados en el cuerpo de la solicitud
    if (!game) {
      return res.status(404).send(); // Si no se encuentra el juego, responde con un código de estado 404 (no encontrado)
    }
    res.send(game); // Responde con el juego actualizado
  } catch (error) {
    res.status(400).send(error); // Si ocurre un error, responde con un código de estado 400 (solicitud incorrecta) y el mensaje de error
  }
};

// Endpoint para eliminar un juego
exports.borrar = async (req, res) => {
  try {
    const game = await Games.findByIdAndDelete(req.params.id); // Busca y elimina un juego por su ID
    if (!game) {
      return res.status(404).send(); // Si no se encuentra el juego, responde con un código de estado 404 (no encontrado)
    }
    res.send(game); // Responde con el juego eliminado
  } catch (error) {
    res.status(500).send(error); // Si ocurre un error, responde con un código de estado 500 (error interno del servidor) y el mensaje de error
  }
};
