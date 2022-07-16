'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('games', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            genre: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'genres',
                    key: 'id',
                },
            },
            platform: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'platforms',
                    key: 'id',
                },
            },
            gameUrl: {
                type: Sequelize.STRING,
            },
            coverImage: {
                type: Sequelize.STRING,
            },
            screenshots: {
                type: Sequelize.STRING,
            },
            createdBy: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('games');
    },
};
