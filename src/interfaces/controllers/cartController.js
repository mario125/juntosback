const cartService = require('../../domain/services/cartService');

class CartController {
  async createCart(req, res) {
    try {

      const { userId } = req.body;
      console.log("----°:",userId);
      const cart = await cartService.createCart(userId);
      res.status(201).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async addItemToCart(req, res) {
    try {
      //const { userId } = req.user;
      const { productId, quantity ,userId } = req.body;
      const cart = await cartService.addItemToCart(userId, productId, quantity);
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async addItemToCart(req, res) {
    try {
      //const { userId } = req.user;
      const { productId, quantity ,userId } = req.body;
      const cart = await cartService.addItemToCart(userId, productId, quantity);
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeItemToCart(req, res) {
    try {
      //const { userId } = req.user;
      const { productId, quantity ,userId } = req.body;
      const cart = await cartService.removeItemFromCart(userId, productId, quantity);
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getActiveCart(req, res) {
    try {
      const { userId } = req.body;
      const cart = await cartService.getActiveCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateStatusCart(req, res) {
    try {
      const { userId, cartId } = req.body;
      const cart = await cartService.updateStatusCart(cartId, userId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getCompleteCart(req, res) {
    try {
      const { userId } = req.body;
      const cart = await cartService.getCompleteCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CartController();
