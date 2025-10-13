'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [{
      fechaPublicacion: Date(),
      descripcion: 'Primer post',
      nickName:'SuperJuan',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fechaPublicacion: Date(),
      descripcion: 'Segundo post',
      nickName:'SuperPablo',
      createdAt: new Date(),
      updatedAt: new Date(),
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
