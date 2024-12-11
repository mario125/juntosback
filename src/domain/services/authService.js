// src/domain/services/authService.js
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const userRepository = require('../../infrastructure/repositories/userRepository');
require('dotenv').config();
const { generateToken } = require('../../app/middlewares/authMiddleware');

class AuthService {
  async register(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser(email, hashedPassword);
    return user;
  }

  async login(email, password) {
    try {
      const userResponse = await userRepository.findByEmail(email);

      if (!userResponse.status) {
        return {
          status: false,
          message: userResponse.message,
          data: null,
        };
      }

      const user = userResponse.data;

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return {
          status: false,
          message: 'Credenciales inválidas: contraseña incorrecta',
          data: null,
        };
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
      });

      return {
        status: true,
        message: 'Inicio de sesión exitoso',
        data: { token },
      };
    } catch (error) {
      return {
        status: false,
        message: 'Error al iniciar sesión',
        data: error.message,
      };
    }
  }
}

module.exports = new AuthService();
