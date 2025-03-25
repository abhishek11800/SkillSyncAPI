"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Courses", {
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
            duration: {
                type: Sequelize.DECIMAL,
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
        await queryInterface.addIndex("Courses", ["title"], {
            unique: true,
            name: "courses_title_idx",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeIndex("Courses", "courses_title_idx");
        await queryInterface.dropTable("Courses");
    },
};
