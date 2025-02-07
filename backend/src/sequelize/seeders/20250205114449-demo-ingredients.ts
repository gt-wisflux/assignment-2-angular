import { QueryInterface } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const ingredients = [
      {
        name: 'Mozzarella Cheese',
        price: 1,
      },
      {
        name: 'Tomato',
        price: 2,
      },
      {
        name: 'Basil',
        price: 3,
      },
      {
        name: 'Pepperoni',
        price: 4,
      },
    ];
    
    await queryInterface.bulkInsert('ingredients', ingredients)
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkDelete('ingredients', {});
  },
};
