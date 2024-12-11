const cartRepository = require('../../infrastructure/repositories/cartRepository');
const productRepository = require('../../infrastructure/repositories/productRepository');

class CartService {
  async createCart(userId) {
    const existingCart = await cartRepository.findActiveCartByUserId(userId);
    console.log("----°crear.......dfdfdfdf..:",existingCart.status);
    if (existingCart.status) return existingCart;
    console.log("----°crearemos un nuevp.............");
    return await cartRepository.createCart(userId);
  }

  async addItemToCart(userId, productId, quantity) {
    try {
        // 1. Buscar carrito activo para el usuario
        const cartResponse = await cartRepository.findActiveCartByUserId(userId);
        if (!cartResponse.status) throw new Error(cartResponse.message);

        const cart = cartResponse.data;

        // 2. Buscar el producto
        const productResponse = await productRepository.findProductById(productId);
        if (!productResponse.status) throw new Error(productResponse.message);

        const product = productResponse.data;

        // 3. Verificar si el producto ya existe en el carrito
        const existingCartItemResponse = await cartRepository.findItemInCart(cart.id, productId);
        let updatedItem;

        if (existingCartItemResponse.status && existingCartItemResponse.data) {
            // Producto ya existe en el carrito, actualizar cantidad y precio
            const existingItem = existingCartItemResponse.data;
            updatedItem = await cartRepository.updateCartItem(existingItem.id, {
                quantity: existingItem.quantity + quantity,
                price: (existingItem.quantity + quantity) * parseFloat(product.price),
            });
        } else {
            // Producto no existe en el carrito, agregar nuevo ítem
            updatedItem = await cartRepository.addItemToCart(
                cart.id,
                productId,
                quantity,
                parseFloat(product.price) * quantity
            );
        }

        // 4. Recalcular el total del carrito
        const cartItemsResponse = await cartRepository.getCartItems(cart.id);
        if (!cartItemsResponse.status) throw new Error(cartItemsResponse.message);

        const cartItems = cartItemsResponse.data;

        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

        await cartRepository.updateCart(cart.id, {
            total_quantity: totalQuantity,
            total_price: totalPrice.toFixed(2), // Asegurar que el precio tenga formato decimal
        });

        // 5. Obtener y devolver toda la información actualizada del carrito
        const updatedCartResponse = await cartRepository.getCartDetails(cart.id);
        if (!updatedCartResponse.status) throw new Error(updatedCartResponse.message);

        return {
            status: true,
            message: 'Producto agregado al carrito exitosamente',
            data: updatedCartResponse.data,
        };
    } catch (error) {
        console.error('Error en addItemToCart:', error);
        return {
            status: false,
            message: 'Error al agregar producto al carrito',
            data: error.message,
        };
    }
}

  
  

async getActiveCart(userId) {
  try {
    // Buscar carrito activo para el usuario
    const cartResponse = await cartRepository.findActiveCartByUserId(userId);
    if (!cartResponse.status) {
      return {
        status: false,
        message: cartResponse.message,
        data: null,
      };
    }

    // Obtener detalles del carrito activo
    const cartDetailsResponse = await cartRepository.getCartDetails(cartResponse.data.id);
    if (!cartDetailsResponse.status) {
      return {
        status: false,
        message: cartDetailsResponse.message,
        data: null,
      };
    }

    // Retornar los detalles completos del carrito
    return {
      status: true,
      message: 'Carrito activo obtenido exitosamente',
      data: cartDetailsResponse.data,
    };
  } catch (error) {
    console.error('Error en getActiveCart:', error);
    return {
      status: false,
      message: 'Error al obtener el carrito activo',
      data: error.message,
    };
  }
}


  async removeItemFromCart(userId, productId, quantity) {
    try {
      // 1. Buscar carrito activo para el usuario
      const cartResponse = await cartRepository.findActiveCartByUserId(userId);
      if (!cartResponse.status) throw new Error(cartResponse.message);
  
      const cart = cartResponse.data;
  
      // 2. Verificar si el producto ya existe en el carrito
      const existingCartItemResponse = await cartRepository.findItemInCart(cart.id, productId);
      if (!existingCartItemResponse.status || !existingCartItemResponse.data) {
        throw new Error('El producto no se encuentra en el carrito');
      }
  
      const existingItem = existingCartItemResponse.data;
  
      let updatedItem;
  
      if (existingItem.quantity > quantity) {
        // Reducir la cantidad del producto en el carrito
        updatedItem = await cartRepository.updateCartItem(existingItem.id, {
          quantity: existingItem.quantity - quantity,
          price: (existingItem.quantity - quantity) * parseFloat(existingItem.price / existingItem.quantity),
        });
      } else {
        // Si la cantidad a reducir es mayor o igual a la actual, eliminar el producto del carrito
        await cartRepository.removeItemFromCart(cart.id, productId);
        updatedItem = null;
      }
  
      // 3. Recalcular el total del carrito
      const cartItemsResponse = await cartRepository.getCartItems(cart.id);
      if (!cartItemsResponse.status) throw new Error(cartItemsResponse.message);
  
      const cartItems = cartItemsResponse.data;
  
      const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
  
      await cartRepository.updateCart(cart.id, {
        total_quantity: totalQuantity,
        total_price: totalPrice.toFixed(2), // Asegurar que el precio tenga formato decimal
      });
  
      // 4. Obtener y devolver toda la información actualizada del carrito
      const updatedCartResponse = await cartRepository.getCartDetails(cart.id);
      if (!updatedCartResponse.status) throw new Error(updatedCartResponse.message);
  
      return {
        status: true,
        message: updatedItem
          ? 'Cantidad del producto reducida en el carrito exitosamente'
          : 'Producto eliminado del carrito exitosamente',
        data: updatedCartResponse.data,
      };
    } catch (error) {
      console.error('Error en removeItemFromCart:', error);
      return {
        status: false,
        message: 'Error al eliminar o reducir producto del carrito',
        data: error.message,
      };
    }
  }

  async updateStatusCart(cartId, userId) {
    try {
      // Buscar carrito activo para el usuario
      const cartResponse = await cartRepository.updateStatusCart(cartId, userId);
      if (!cartResponse.status) {
        return {
          status: false,
          message: cartResponse.message,
          data: null,
        };
      }
  
     
  
      // Retornar los detalles completos del carrito
      return {
        status: true,
        message: ' Estado de carrito actualizado exitosamente',
        data: cartResponse.data,
      };
    } catch (error) {
      console.error('Error en getActiveCart:', error);
      return {
        status: false,
        message: 'Error al obtener el carrito activo',
        data: error.message,
      };
    }
  }



  async getCompleteCart(userId) {
    try {
      // Buscar carrito activo para el usuario
      const cartResponse = await cartRepository.getCartComplete(userId);
      if (!cartResponse.status) {
        return {
          status: false,
          message: cartResponse.message,
          data: null,
        };
      }
  
     
  
  
      return {
        status: true,
        message: ' Lista de carrito obtenida exitosamente',
        data: cartResponse.data,
      };
    } catch (error) {
      console.error('Error en getActiveCart:', error);
      return {
        status: false,
        message: 'Error al obtener el carrito activo',
        data: error.message,
      };
    }
  }
  
}

module.exports = new CartService();
