const Payment = require('../../domain/entities/Payment');

class PaymentRepository {
  async createPayment(data) {
    return await Payment.create(data);
  }

  async findPaymentsByCartId(cartId) {
    return await Payment.findAll({ where: { cartId } });
  }

  async updatePaymentStatus(paymentId, status) {
    const payment = await Payment.findByPk(paymentId);
    if (payment) {
      return await payment.update({ status });
    }
    return null;
  }
}

module.exports = new PaymentRepository();
