const paymentRepository = require('../../infrastructure/repositories/paymentRepository');
const cartRepository = require('../../infrastructure/repositories/cartRepository');

class PaymentService {
  async processPayment(cartId, method, amount) {
    const cart = await cartRepository.findActiveCartByUserId(cartId);
    if (!cart || cart.status !== 'in_payment') throw new Error('Cart is not ready for payment');

    const payment = await paymentRepository.createPayment({
      cartId,
      method,
      amount,
      status: 'pending',
    });

    // Update cart status
    await cartRepository.updateCart(cartId, { status: 'completed' });

    return payment;
  }

  async updatePaymentStatus(paymentId, status) {
    const updatedPayment = await paymentRepository.updatePaymentStatus(paymentId, status);
    if (!updatedPayment) throw new Error('Payment not found or failed to update');
    return updatedPayment;
  }
}

module.exports = new PaymentService();
