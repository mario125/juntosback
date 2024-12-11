// src/infrastructure/repositories/userRepository.js
const { User } = require('../../infrastructure/database/db');

class UserRepository {
  async createUser(email, password) {
    try {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return {
          status: false,
          message: 'El correo electrónico ya está registrado',
          data: null,
        };
      }

      const createdAt = new Date();
      const updatedAt = new Date();

      const user = await User.create({
        email,
        password,
        createdAt,
        updatedAt,
      });

      return {
        status: true,
        message: 'Usuario creado con éxito',
        data: user,
      };
    } catch (error) {
      return {
        status: false,
        message: 'Error al crear el usuario',
        data: error.message,
      };
    }
  }

  async findByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return {
          status: false,
          message: 'El usuario no existe',
          data: null,
        };
      }
  
      return {
        status: true,
        message: 'Usuario encontrado',
        data: user,
      };
    } catch (error) {
      return {
        status: false,
        message: 'Error al buscar el usuario',
        data: error.message,
      };
    }
  }
  

  async findById(id) {
    return await User.findByPk(id);
  }
}

module.exports = new UserRepository();
