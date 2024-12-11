const Order = require('../../domain/entities/Order');

class OrderRepository {
  async createOrder(data) {
    return await Order.create(data);
  }

  async findOrdersByUserId(userId) {
    return await Order.findAll({ where: { userId } });
  }

  async updateOrderStatus(orderId, status) {
    const order = await Order.findByPk(orderId);
    if (order) {
      return await order.update({ status });
    }
    return null;
  }
}

module.exports = new OrderRepository();
