const Tarjeta = require('../models/tarjeta.model');

// Controlador para crear una nueva tarjeta
exports.createTarjeta = async (req, res) => {
  try {
    const tarjeta = new Tarjeta(req.body); // Crear una nueva instancia de Tarjeta utilizando los datos del cuerpo de la solicitud
    await tarjeta.save(); // Guardar la nueva tarjeta en la base de datos
    res.status(201).send(tarjeta); // Enviar una respuesta con la tarjeta creada y un código de estado 201 (Created)
  } catch (error) {
    res.status(400).send(error); // Enviar una respuesta con un código de estado 400 (Bad Request) si hay un error
  }
};

// Controlador para obtener todas las tarjetas
exports.getTodo = async (req, res) => {
  try {
    const tarjetas = await Tarjeta.find(); // Obtener todas las tarjetas de la base de datos
    res.send(tarjetas); // Enviar una respuesta con las tarjetas obtenidas
  } catch (error) {
    res.status(500).send(error); // Enviar una respuesta con un código de estado 500 (Internal Server Error) si hay un error
  }
};

// Controlador para obtener una tarjeta por su ID
exports.getPorid = async (req, res) => {
  try {
    const tarjeta = await Tarjeta.findById(req.params.id); // Buscar una tarjeta por su ID en la base de datos
    if (!tarjeta) {
      return res.status(404).send(); // Enviar una respuesta con un código de estado 404 (Not Found) si la tarjeta no se encuentra
    }
    res.send(tarjeta); // Enviar una respuesta con la tarjeta encontrada
  } catch (error) {
    res.status(500).send(error); // Enviar una respuesta con un código de estado 500 (Internal Server Error) si hay un error
  }
};

// Controlador para actualizar una tarjeta por su ID
exports.actualizar = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['NumTarjeta', 'Fecha', 'Cvv', 'Titular'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' }); // Enviar una respuesta con un código de estado 400 (Bad Request) si hay una operación no válida
  }

  try {
    const tarjeta = await Tarjeta.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Buscar y actualizar una tarjeta por su ID
    if (!tarjeta) {
      return res.status(404).send(); // Enviar una respuesta con un código de estado 404 (Not Found) si la tarjeta no se encuentra
    }
    res.send(tarjeta); // Enviar una respuesta con la tarjeta actualizada
  } catch (error) {
    res.status(400).send(error); // Enviar una respuesta con un código de estado 400 (Bad Request) si hay un error
  }
};

// Controlador para eliminar una tarjeta por su ID
exports.borrar = async (req, res) => {
  try {
    const tarjeta = await Tarjeta.findByIdAndDelete(req.params.id); // Buscar y eliminar una tarjeta por su ID
    if (!tarjeta) {
      return res.status(404).send(); // Enviar una respuesta con un código de estado 404 (Not Found) si la tarjeta no se encuentra
    }
    res.send(tarjeta); // Enviar una respuesta con la tarjeta eliminada
  } catch (error) {
    res.status(500).send(error); // Enviar una respuesta con un código de estado 500 (Internal Server Error) si hay un error
  }
};
