const paymentService = require('../../domain/services/paymentService');

class PaymentController {
  async processPayment(req, res) {
    try {
      const { cartId, method, amount } = req.body;
      const payment = await paymentService.processPayment(cartId, method, amount);
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new PaymentController();
