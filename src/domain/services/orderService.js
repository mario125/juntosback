const orderRepository = require('../../infrastructure/repositories/orderRepository');
const cartRepository = require('../../infrastructure/repositories/cartRepository');

class OrderService {
  async createOrder(userId, cartId) {
    const cart = await cartRepository.findActiveCartByUserId(userId);
    if (!cart || cart.id !== cartId) throw new Error('Invalid cart for user');

    const order = await orderRepository.createOrder({
      userId,
      cartId,
      totalPrice: cart.totalPrice,
      status: 'created',
    });

    // Mark the cart as completed
    await cartRepository.updateCart(cartId, { status: 'completed' });

    return order;
  }

  async getUserOrders(userId) {
    return await orderRepository.findOrdersByUserId(userId);
  }

  async updateOrderStatus(orderId, status) {
    const updatedOrder = await orderRepository.updateOrderStatus(orderId, status);
    if (!updatedOrder) throw new Error('Order not found or failed to update');
    return updatedOrder;
  }
}

module.exports = new OrderService();
