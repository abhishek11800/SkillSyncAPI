"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Skills", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
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
        await queryInterface.addIndex("Skills", ["title"], {
            unique: true,
            name: "skills_title_idx",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeIndex("Skills", "skills_title_idx");
        await queryInterface.dropTable("Skills");
    },
};
