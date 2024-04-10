const UsuarioModel = require('../models/usuario.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controlador para crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    // Obtener datos del cuerpo de la solicitud
    const { Username, Email, Password, Usuario, administrador } = req.body;
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(Password, 10); // El segundo parámetro es el número de rondas de encriptación
    // Crear una nueva instancia de Usuario con la contraseña encriptada
    const usuario = new UsuarioModel({
      Username,
      Password:hashedPassword,
      Email,
      Usuario,
      administrador
    });
    // Guardar el nuevo usuario en la base de datos
    await usuario.save();
    // Enviar una respuesta con el usuario creado y un código de estado 201 (Created)
    res.status(201).send(usuario);
  } catch (error) {
    // Enviar una respuesta con un código de estado 400 (Bad Request) si hay un error
    res.status(400).send(error);
  }
};

// Controlador para obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.find(); // Obtener todos los usuarios de la base de datos
    res.send(usuarios); // Enviar una respuesta con los usuarios obtenidos
  } catch (error) {
    res.status(500).send(error); // Enviar una respuesta con un código de estado 500 (Internal Server Error) si hay un error
  }
};

// Controlador para obtener un usuario por su ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await UsuarioModel.findById(req.params.id); // Buscar un usuario por su ID en la base de datos
    if (!usuario) {
      return res.status(404).send(); // Enviar una respuesta con un código de estado 404 (Not Found) si el usuario no se encuentra
    }
    res.send(usuario); // Enviar una respuesta con el usuario encontrado
  } catch (error) {
    res.status(500).send(error); // Enviar una respuesta con un código de estado 500 (Internal Server Error) si hay un error
  }
};

// Controlador para actualizar un usuario por su ID
exports.updateUsuario = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['Username', 'Email', 'Password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' }); // Enviar una respuesta con un código de estado 400 (Bad Request) si hay una operación no válida
  }

  try {
    const usuario = await UsuarioModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Buscar y actualizar un usuario por su ID
    if (!usuario) {
      return res.status(404).send(); // Enviar una respuesta con un código de estado 404 (Not Found) si el usuario no se encuentra
    }
    res.send(usuario); // Enviar una respuesta con el usuario actualizado
  } catch (error) {
    res.status(400).send(error); // Enviar una respuesta con un código de estado 400 (Bad Request) si hay un error
  }
};

// Controlador para eliminar un usuario por su ID
exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await UsuarioModel.findByIdAndDelete(req.params.id); // Buscar y eliminar un usuario por su ID
    if (!usuario) {
      return res.status(404).send(); // Enviar una respuesta con un código de estado 404 (Not Found) si el usuario no se encuentra
    }
    res.send(usuario); // Enviar una respuesta con el usuario eliminado
  } catch (error) {
    res.status(500).send(error); // Enviar una respuesta con un código de estado 500 (Internal Server Error) si hay un error
  }
};

exports.loginUsuario = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Buscar el usuario por su correo electrónico en la base de datos
    const usuario = await UsuarioModel.findOne({ Email });
    if (!usuario) {
      return res.status(401).send({ error: 'Credenciales inválidas' });
    }

    // Verificar la contraseña ingresada con la contraseña almacenada en la base de datos
    const isPasswordMatch = await bcrypt.compare(Password, usuario.Password);
    if (!isPasswordMatch) {
      return res.status(401).send({ error: 'Credenciales inválidas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ usuario: usuario._id }, process.env.SECRET_JWT, { expiresIn: '1h' });

    // Enviar una respuesta con el token y un mensaje de éxito
    res.send({ token, message: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(500).send(error);
  }
};