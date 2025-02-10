//'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

export = {
  // defined the migration actions (create table, add columns)
  up: async (queryInterface: QueryInterface):Promise<void> => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  
  // reverts what up does
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users')
  },
};
