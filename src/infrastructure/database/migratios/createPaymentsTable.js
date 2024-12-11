module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Payments', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        cartId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Carts',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        method: {
          type: Sequelize.ENUM('credit_card', 'paypal', 'bank_transfer'),
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM('pending', 'confirmed', 'failed', 'cancelled'),
          defaultValue: 'pending',
        },
        amount: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Payments');
    },
  };
  