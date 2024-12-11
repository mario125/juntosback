const { CartItem, Cart, Product } = require('../../infrastructure/database/db');

class CartRepository {
  async findActiveCartByUserId(userId) {
    try {
      console.log(`Buscando carrito activo para user_id: ${userId}`);
      const cart = await Cart.findOne({
        where: { user_id: userId, status: 'active' },
      });
      if (!cart) {
        return {
          status: false,
          message: 'No hay un carrito activo para el usuario',
          data: null,
        };
      }
      return { status: true, message: 'Carrito activo encontrado', data: cart };
    } catch (error) {
      console.error('Error al buscar el carrito activo:', error);
      return {
        status: false,
        message: 'Error al buscar el carrito activo',
        data: error.message,
      };
    }
  }

  async getCartDetails(cartId) {
    try {
      console.log(`Obteniendo detalles del carrito cart_id: ${cartId}`);
      const cart = await Cart.findOne({
        where: { id: cartId },
        include: [
          {
            model: CartItem,
            as: 'CartItems', 
            include: [
              {
                model: Product,
                as: 'Product', 
                attributes: ['id', 'name', 'description', 'price', 'image_url'],
              },
            ],
          },
        ],
      });
  
      if (!cart) {
        return {
          status: false,
          message: 'Carrito no encontrado',
          data: null,
        };
      }
  
      return {
        status: true,
        message: 'Detalles del carrito obtenidos con éxito',
        data: cart,
      };
    } catch (error) {
      console.error('Error al obtener los detalles del carrito:', error);
      return {
        status: false,
        message: 'Error al obtener los detalles del carrito',
        data: error.message,
      };
    }
  }
  
  

  async createCart(userId) {
    try {
      console.log(`Creando carrito para user_id: ${userId}`);
      const cart = await Cart.create({
        user_id: userId,
        status: 'active',
        total_quantity: 0,
        total_price: 0.0,
      });
      return {
        status: true,
        message: 'Carrito creado exitosamente',
        data: cart,
      };
    } catch (error) {
      console.error('Error al crear el carrito:', error);
      return {
        status: false,
        message: 'Error al crear el carrito',
        data: error.message,
      };
    }
  }

  async updateCart(cartId, data) {
    try {
      const cart = await Cart.findByPk(cartId);
      if (!cart) {
        return { status: false, message: 'Carrito no encontrado', data: null };
      }
      const updatedCart = await cart.update(data);
      return {
        status: true,
        message: 'Carrito actualizado exitosamente',
        data: updatedCart,
      };
    } catch (error) {
      console.error('Error al actualizar el carrito:', error);
      return {
        status: false,
        message: 'Error al actualizar el carrito',
        data: error.message,
      };
    }
  }

  async addItemToCart(cartId, productId, quantity, price) {
    try {
      const item = await CartItem.create({
        cart_id: cartId,
        product_id: productId,
        quantity,
        price,
      });
      return {
        status: true,
        message: 'Producto agregado al carrito',
        data: item,
      };
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      return {
        status: false,
        message: 'Error al agregar producto al carrito',
        data: error.message,
      };
    }
  }

  async findItemInCart(cartId, productId) {
    try {
      console.log(`Buscando producto en carrito cart_id: ${cartId}, product_id: ${productId}`);
      const item = await CartItem.findOne({
        where: { cart_id: cartId, product_id: productId },
      });
      if (!item) {
        return {
          status: false,
          message: 'Producto no encontrado en el carrito',
          data: null,
        };
      }
      return {
        status: true,
        message: 'Producto encontrado en el carrito',
        data: item,
      };
    } catch (error) {
      console.error('Error al buscar producto en el carrito:', error);
      return {
        status: false,
        message: 'Error al buscar producto en el carrito',
        data: error.message,
      };
    }
  }

  async removeItemFromCart(cartId, productId) {
    try {
      const item = await CartItem.findOne({
        where: { cart_id: cartId, product_id: productId },
      });
      if (!item) {
        return {
          status: false,
          message: 'Producto no encontrado en el carrito',
          data: null,
        };
      }
      await item.destroy();
      return {
        status: true,
        message: 'Producto eliminado del carrito',
        data: null,
      };
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      return {
        status: false,
        message: 'Error al eliminar producto del carrito',
        data: error.message,
      };
    }
  }

  async updateCartItem(itemId, updates) {
    try {
      console.log(`Actualizando producto en carrito: item_id: ${itemId}`);
      
      // Buscar el ítem del carrito por su ID
      const item = await CartItem.findByPk(itemId);
      if (!item) {
        return {
          status: false,
          message: 'Producto no encontrado en el carrito',
          data: null,
        };
      }
  
      // Actualizar el ítem con los valores proporcionados
      const updatedItem = await item.update(updates);
  
      return {
        status: true,
        message: 'Producto actualizado en el carrito',
        data: updatedItem,
      };
    } catch (error) {
      console.error('Error al actualizar producto en el carrito:', error);
      return {
        status: false,
        message: 'Error al actualizar producto en el carrito',
        data: error.message,
      };
    }
  }

  async getCartItems(cartId) {
    try {
      console.log(`Obteniendo items del carrito cart_id: ${cartId}`);
      const items = await CartItem.findAll({
        where: { cart_id: cartId },
      });
  
      if (!items || items.length === 0) {
        return {
          status: false,
          message: 'No se encontraron productos en el carrito',
          data: null,
        };
      }
  
      return {
        status: true,
        message: 'Items del carrito obtenidos con éxito',
        data: items,
      };
    } catch (error) {
      console.error('Error al obtener los items del carrito:', error);
      return {
        status: false,
        message: 'Error al obtener los items del carrito',
        data: error.message,
      };
    }
  }


  async updateStatusCart(cartId, userId) {
    try {
     
      const cart = await Cart.findOne({ where: { id: cartId, user_id: userId } });
  
      if (!cart) {
        return { status: false, message: 'Carrito no encontrado o no pertenece al usuario', data: null };
      }
  
    
      if (cart.status === 'completed') {
        return { status: false, message: 'El carrito no está en estado válido para completarse', data: null };
      }
  
      // Verificar si el carrito tiene al menos un ítem
      const cartItems = await CartItem.findAll({ where: { cart_id: cartId } });
  
      if (cartItems.length === 0) {
        return { status: false, message: 'El carrito está vacío y no puede completarse', data: null };
      }
  
     
      cart.status = 'completed';
      await cart.save();
  
      return {
        status: true,
        message: 'Carrito actualizado exitosamente a estado completado',
        data: cart,
      };
    } catch (error) {
      console.error('Error al actualizar el carrito:', error);
      return {
        status: false,
        message: 'Error al actualizar el carrito',
        data: error.message,
      };
    }
  }


  async getCartComplete(userId) {
    try {
      console.log(`Obteniendo detalles del carrito cart_id: ${userId}`);
      const cart = await Cart.findAll({
        where: { user_id: userId },
        include: [
          {
            model: CartItem,
            as: 'CartItems', 
            include: [
              {
                model: Product,
                as: 'Product', 
                attributes: ['id', 'name', 'description', 'price', 'image_url'],
              },
            ],
          },
        ],
      });
  
      if (!cart) {
        return {
          status: false,
          message: 'Carrito no encontrado',
          data: null,
        };
      }
  
      return {
        status: true,
        message: 'Detalles del carrito obtenidos con éxito',
        data: cart,
      };
    } catch (error) {
      console.error('Error al obtener los detalles del carrito:', error);
      return {
        status: false,
        message: 'Error al obtener los detalles del carrito',
        data: error.message,
      };
    }
  }
  
  
  
}

module.exports = new CartRepository();
