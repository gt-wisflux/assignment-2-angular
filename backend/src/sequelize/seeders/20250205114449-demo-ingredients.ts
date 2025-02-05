import { QueryInterface } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const ingredients = [
      {
        name: 'Mozzarella Cheese',
        price: 1.5,
      },
      {
        name: 'Tomato',
        price: 2.5,
      },
      {
        name: 'Basil',
        price: 3.5,
      },
      {
        name: 'Pepperoni',
        price: 4.5,
      },
    ];
    
    await queryInterface.bulkInsert('ingredients', ingredients)
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkDelete('ingredients', {});
  },
};
