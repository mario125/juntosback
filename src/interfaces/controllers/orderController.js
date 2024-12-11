const orderService = require('../../domain/services/orderService');

class OrderController {
  async createOrder(req, res) {
    try {
      const { userId } = req.user;
      const { cartId } = req.body;
      const order = await orderService.createOrder(userId, cartId);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserOrders(req, res) {
    try {
      const { userId } = req.user;
      const orders = await orderService.getUserOrders(userId);
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();
