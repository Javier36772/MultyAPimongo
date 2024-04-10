const jwt = require('jsonwebtoken');
const secretJWT = process.env.SECRET_JWT; // Importa el secreto desde una variable de entorno

const verificarJWT = (req, res, next) => {
    try {
        // Verifica si el token está presente en el encabezado Authorization
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: "Token de autenticación no proporcionado"
            });
        }

        // Verifica el token JWT utilizando el secreto
        jwt.verify(token, secretJWT, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    message: "Error al validar token de autenticación",
                    error: err.message
                });
            }

            // Adjunta los datos decodificados del usuario al objeto de solicitud (req)
            req.usuario = decode.usuario;
            next();
        });
    } catch (error) {
        // Manejo de errores generales
        return res.status(500).json({
            message: "Error interno del servidor al validar token de autenticación",
            error: error.message
        });
    }
};

module.exports = verificarJWT;
