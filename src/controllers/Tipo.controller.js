const Tipo = require('../models/tipo.models');

// Controlador para crear un nuevo tipo
exports.createTipo = async (req, res) => {
  try {
    const tipo = new Tipo(req.body); // Crear una nueva instancia de Tipo utilizando los datos del cuerpo de la solicitud
    await tipo.save(); // Guardar el nuevo tipo en la base de datos
    res.status(201).send(tipo); // Enviar una respuesta con el tipo creado y un código de estado 201 (Created)
  } catch (error) {
    res.status(400).send(error); // Enviar una respuesta con un código de estado 400 (Bad Request) si hay un error
  }
};

// Controlador para obtener todos los tipos
exports.getTodo = async (req, res) => {
  try {
    const tipos = await Tipo.find(); // Obtener todos los tipos de la base de datos
    res.send(tipos); // Enviar una respuesta con los tipos obtenidos
  } catch (error) {
    res.status(500).send(error); // Enviar una respuesta con un código de estado 500 (Internal Server Error) si hay un error
  }
};

// Controlador para obtener un tipo por su ID
exports.getPorid = async (req, res) => {
  try {
    const tipo = await Tipo.findById(req.params.id); // Buscar un tipo por su ID en la base de datos
    if (!tipo) {
      return res.status(404).send(); // Enviar una respuesta con un código de estado 404 (Not Found) si el tipo no se encuentra
    }
    res.send(tipo); // Enviar una respuesta con el tipo encontrado
  } catch (error) {
    res.status(500).send(error); // Enviar una respuesta con un código de estado 500 (Internal Server Error) si hay un error
  }
};

// Controlador para actualizar un tipo por su ID
exports.actualizar = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['SteamKey', 'Cuenta'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' }); // Enviar una respuesta con un código de estado 400 (Bad Request) si hay una operación no válida
  }

  try {
    const tipo = await Tipo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Buscar y actualizar un tipo por su ID
    if (!tipo) {
      return res.status(404).send(); // Enviar una respuesta con un código de estado 404 (Not Found) si el tipo no se encuentra
    }
    res.send(tipo); // Enviar una respuesta con el tipo actualizado
  } catch (error) {
    res.status(400).send(error); // Enviar una respuesta con un código de estado 400 (Bad Request) si hay un error
  }
};

// Controlador para eliminar un tipo por su ID
exports.borrar = async (req, res) => {
  try {
    const tipo = await Tipo.findByIdAndDelete(req.params.id); // Buscar y eliminar un tipo por su ID
    if (!tipo) {
      return res.status(404).send(); // Enviar una respuesta con un código de estado 404 (Not Found) si el tipo no se encuentra
    }
    res.send(tipo); // Enviar una respuesta con el tipo eliminado
  } catch (error) {
    res.status(500).send(error); // Enviar una respuesta con un código de estado 500 (Internal Server Error) si hay un error
  }
};
