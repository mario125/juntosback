const productRepository = require('../../infrastructure/repositories/productRepository');

class ProductService {
  async getAllProducts() {
    return await productRepository.getAllProducts();
  }

  async getProductById(productId) {
    const product = await productRepository.findProductById(productId);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async createProduct(data) {
    return await productRepository.createProduct(data);
  }

  async updateProduct(productId, data) {
    const product = await productRepository.updateProduct(productId, data);
    if (!product) throw new Error('Product not found or failed to update');
    return product;
  }

  async deleteProduct(productId) {
    const result = await productRepository.deleteProduct(productId);
    if (!result) throw new Error('Product not found or failed to delete');
    return result;
  }
}

module.exports = new ProductService();
