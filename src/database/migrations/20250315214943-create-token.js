"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Tokens", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            token: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            expiresAt: {
                type: Sequelize.DATE,
                allowNull: false,
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
        await queryInterface.addIndex("Tokens", ["token"], {
            unique: true,
            name: "tokens_token_idx",
        });

        // Add an index to the email column
        await queryInterface.addIndex("Users", ["email"], {
            unique: true,
            name: "users_email_idx",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeIndex("Users", "users_email_idx");
        await queryInterface.removeIndex("Tokens", "tokens_token_idx");
        await queryInterface.dropTable("Tokens");
    },
};
