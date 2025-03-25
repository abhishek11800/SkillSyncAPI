"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Integrations", {
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
            logo: {
                type: Sequelize.STRING,
            },
            docs: {
                type: Sequelize.STRING,
            },
            live: {
                type: Sequelize.BOOLEAN,
            },
            clientId: {
                type: Sequelize.TEXT,
            },
            clientSecret: {
                type: Sequelize.TEXT,
            },
            displayName: {
                type: Sequelize.STRING,
            },
            authPath: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        // Add an index to the token column
        await queryInterface.addIndex("Integrations", ["title"], {
            unique: true,
            name: "integrations_title_idx",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeIndex(
            "Integrations",
            "integrations_title_idx"
        );
        await queryInterface.dropTable("Integrations");
    },
};
