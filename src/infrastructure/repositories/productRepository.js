const { Product } = require('../../infrastructure/database/db');

class ProductRepository {
  async getAllProducts() {
    try {
      const products = await Product.findAll();
      return {
        status: true,
        message: 'Productos obtenidos con éxito',
        data: products,
      };
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      return {
        status: false,
        message: 'Error al obtener los productos',
        data: error.message,
      };
    }
  }

  async findProductById(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return {
          status: false,
          message: `Producto con id ${id} no encontrado`,
          data: null,
        };
      }
      return {
        status: true,
        message: 'Producto encontrado',
        data: product,
      };
    } catch (error) {
      console.error('Error al buscar el producto:', error);
      return {
        status: false,
        message: 'Error al buscar el producto',
        data: error.message,
      };
    }
  }

  async createProduct(data) {
    try {
      const product = await Product.create(data);
      return {
        status: true,
        message: 'Producto creado con éxito',
        data: product,
      };
    } catch (error) {
      console.error('Error al crear el producto:', error);
      return {
        status: false,
        message: 'Error al crear el producto',
        data: error.message,
      };
    }
  }

  async updateProduct(id, data) {
    try {
      const productResponse = await this.findProductById(id);
      if (!productResponse.status) {
        return productResponse;
      }
      const updatedProduct = await productResponse.data.update(data);
      return {
        status: true,
        message: 'Producto actualizado con éxito',
        data: updatedProduct,
      };
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      return {
        status: false,
        message: 'Error al actualizar el producto',
        data: error.message,
      };
    }
  }

  async deleteProduct(id) {
    try {
      const productResponse = await this.findProductById(id);
      if (!productResponse.status) {
        return productResponse;
      }
      await productResponse.data.destroy();
      return {
        status: true,
        message: 'Producto eliminado con éxito',
        data: null,
      };
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      return {
        status: false,
        message: 'Error al eliminar el producto',
        data: error.message,
      };
    }
  }
}

module.exports = new ProductRepository();
