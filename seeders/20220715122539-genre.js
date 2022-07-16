'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        return queryInterface.bulkInsert('genres', [{
            name: 'Action',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Horror',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Puzzle',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Platformer',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'RPG',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
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