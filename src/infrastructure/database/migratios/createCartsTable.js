module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Carts', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        totalQuantity: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        totalPrice: {
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: 0.0,
        },
        status: {
          type: Sequelize.ENUM('active', 'in_payment', 'completed', 'cancelled'),
          defaultValue: 'active',
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
      await queryInterface.dropTable('Carts');
    },
  };
  