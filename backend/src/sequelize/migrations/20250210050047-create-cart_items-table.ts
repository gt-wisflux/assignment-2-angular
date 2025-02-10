import { DataTypes, QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('cart_items', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'carts', key: 'id' },
        onDelete: 'CASCADE', // If a cart is deleted, remove cart_items
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'items', key: 'id' },
        onDelete: 'RESTRICT', // Prevent item deletion if it's in a cart
      },
      itemSize: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      itemSizePrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      itemPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('cart_items');
  },
};
