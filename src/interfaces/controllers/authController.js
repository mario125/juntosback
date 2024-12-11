// src/interfaces/controllers/authController.js
const authService = require('../../domain/services/authService');
const { apiResponse, handleError } = require('../../utils/response'); // Utilizamos las utilidades

class AuthController {
  async register(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json(
            apiResponse(false, 'Correo y contraseña son requeridos', null, 400)
          );
      }

      const response = await authService.register(email, password);

      if (!response.status) {
        return res
          .status(400)
          .json(
            apiResponse(response.status, response.message, response.data, 400)
          );
      }

      return res
        .status(200)
        .json(
          apiResponse(true, 'Usuario registrado con éxito', response.data, 200)
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          apiResponse(
            false,
            'Hubo un error en el servidor. Intente nuevamente más tarde.',
            error.message,
            500
          )
        );
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validación de datos de entrada
      if (!email || !password) {
        return res
          .status(400)
          .json(
            apiResponse(false, 'Correo y contraseña son requeridos', null, 400)
          );
      }

      // Intentar realizar el login con el servicio
      const response = await authService.login(email, password);

      // Validar el estado del servicio
      if (!response.status) {
        return res
          .status(400)
          .json(
            apiResponse(response.status, response.message, response.data, 400)
          );
      }

      return res
        .status(200)
        .json(
          apiResponse(true, 'Inicio de sesión exitoso', response.data, 200)
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          apiResponse(
            false,
            'Hubo un error en el servidor. Intente nuevamente más tarde.',
            error.message,
            500
          )
        );
    }
  }
}

module.exports = new AuthController();
