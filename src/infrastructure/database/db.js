// src/infrastructure/database/db.js
const { Sequelize } = require('sequelize');
const config = require('../../config/config');

// Crear instancia de Sequelize
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    logging: false,
    define: {
      underscored: true, 
    },
    sync: { force: false, alter: false },
  }
);

// Importar y definir modelos
const defineUser = require('../../domain/entities/User');
const defineProduct = require('../../domain/entities/Product');
const defineCart = require('../../domain/entities/Cart');
const defineCartItem = require('../../domain/entities/CartItem');
const defineOrder = require('../../domain/entities/Order');
const definePayment = require('../../domain/entities/Payment');

const User = defineUser(sequelize);
const Product = defineProduct(sequelize);
const Cart = defineCart(sequelize);
const CartItem = defineCartItem(sequelize);
const Order = defineOrder(sequelize);
const Payment = definePayment(sequelize);

// Configurar relaciones entre los modelos
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

Cart.hasMany(Order, { foreignKey: 'cartId' });
Order.belongsTo(Cart, { foreignKey: 'cartId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Cart.hasMany(Payment, { foreignKey: 'cartId' });
Payment.belongsTo(Cart, { foreignKey: 'cartId' });

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  CartItem,
  Order,
  Payment,
};
