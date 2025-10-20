'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Asigna', [{
      PostIdPost: 1,
      TagIdTag: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      PostIdPost: 2,
      TagIdTag: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
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
