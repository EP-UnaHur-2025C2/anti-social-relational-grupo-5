'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [{
      fechaComentario: new Date(),
      contenido: 'Hola amigos de esta red social',
      idPost: 1,
      nickName: 'SuperJuan',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fechaComentario: new Date(),
      contenido: 'Hola Juan',
      idPost: 1,
      nickName: 'SuperPablo',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', {
      contenido: [
        'Hola amigos de esta red social',
        'Hola Juan'
      ]
    }, {}); 
  }
};
