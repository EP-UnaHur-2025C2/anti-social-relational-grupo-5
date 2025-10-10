'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', 
      [
    {
      nickName: 'test',
      nombre: 'Juan',
      apellido: 'Perez'
    },
    {
      nickName: 'test2',
      nombre: 'Pablo',
      apellido: 'Perez'
    }
  
  ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
