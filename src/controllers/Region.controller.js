const Region = require('../models/region.model');

// Controlador para crear una nueva región
exports.crearRegion = async (req, res) => {
  try {
    const region = new Region(req.body); // Crear una nueva instancia de Región utilizando los datos del cuerpo de la solicitud
    await region.save(); // Guardar la nueva región en la base de datos
    res.status(201).send(region); // Enviar una respuesta con la región creada y un código de estado 201 (Created)
  } catch (error) {
    res.status(400).send(error); // Enviar una respuesta con un código de estado 400 (Bad Request) si hay un error
  }
};

// Controlador para obtener todas las regiones
exports.getTodo = async (req, res) => {
  try {
    const regions = await Region.find(); // Obtener todas las regiones de la base de datos
    res.send(regions); // Enviar una respuesta con las regiones obtenidas
  } catch (error) {
    res.status(500).send(error); // Enviar una respuesta con un código de estado 500 (Internal Server Error) si hay un error
  }
};

// Controlador para obtener una región por su ID
exports.getPorid = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id); // Buscar una región por su ID en la base de datos
    if (!region) {
      return res.status(404).send(); // Enviar una respuesta con un código de estado 404 (Not Found) si la región no se encuentra
    }
    res.send(region); // Enviar una respuesta con la región encontrada
  } catch (error) {
    res.status(500).send(error); // Enviar una respuesta con un código de estado 500 (Internal Server Error) si hay un error
  }
};

// Controlador para actualizar una región por su ID
exports.actualizar = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['global', 'latam', 'europa', 'turquia', 'argen'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' }); // Enviar una respuesta con un código de estado 400 (Bad Request) si hay una operación no válida
  }

  try {
    const region = await Region.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Buscar y actualizar una región por su ID
    if (!region) {
      return res.status(404).send(); // Enviar una respuesta con un código de estado 404 (Not Found) si la región no se encuentra
    }
    res.send(region); // Enviar una respuesta con la región actualizada
  } catch (error) {
    res.status(400).send(error); // Enviar una respuesta con un código de estado 400 (Bad Request) si hay un error
  }
};

// Controlador para eliminar una región por su ID
exports.borrar = async (req, res) => {
  try {
    const region = await Region.findByIdAndDelete(req.params.id); // Buscar y eliminar una región por su ID
    if (!region) {
      return res.status(404).send(); // Enviar una respuesta con un código de estado 404 (Not Found) si la región no se encuentra
    }
    res.send(region); // Enviar una respuesta con la región eliminada
  } catch (error) {
    res.status(500).send(error); // Enviar una respuesta con un código de estado 500 (Internal Server Error) si hay un error
  }
};
