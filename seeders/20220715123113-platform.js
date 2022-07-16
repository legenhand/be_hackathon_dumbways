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
        return queryInterface.bulkInsert('platforms', [{
            name: 'Browser',
            type: 'Url',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Windows',
            type: 'Download',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Linux',
            type: 'Download',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'macOS',
            type: 'Download',
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