const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cart = sequelize.define(
    'Cart',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      total_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        field: 'total_quantity',
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
        allowNull: false,
        field: 'total_price',
      },
      status: {
        type: DataTypes.ENUM('active', 'in_payment', 'completed', 'cancelled'),
        defaultValue: 'active',
        allowNull: false,
        field: 'status',
      },
      abandoned_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'abandoned_at',
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        field: 'created_at',
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        field: 'updated_at',
      },
    },
    {
      tableName: 'cart',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Cart;
};
