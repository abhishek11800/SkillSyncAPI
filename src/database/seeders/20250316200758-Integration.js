"use strict";

/** @type {import('sequelize-cli').Migration} */
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
        await queryInterface.bulkInsert(
            "Integrations",
            [
                {
                    title: "github",
                    description:
                        "Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.",
                    logo: "git.png",
                    live: true,
                    clientId: "scascsacascsacasc",
                    clientSecret: "scascsacsacsacsac",
                    displayName: "GitHub",
                    authPath: "/users/oauth/github",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: "jira",
                    description:
                        "Jira is an issue tracking product developed by Atlassian that allows bug tracking and agile project management.",
                    logo: "jira.png",
                    live: true,
                    clientId: "scascsacascsacasc",
                    clientSecret: "scascsacsacsacsac",
                    displayName: "Jira",
                    authPath: "/users/oauth/jira",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: "gitlab",
                    description:
                        "GitLab is a complete DevOps platform, delivered as a single application, fundamentally changing the way Development, Security, and Ops teams collaborate and build software.",
                    logo: "gitlab.png",
                    live: true,
                    clientId: "scascsacascsacasc",
                    clientSecret: "scascsacsacsacsac",
                    displayName: "GitLab",
                    authPath: "/users/oauth/gitlab",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Integrations", null, {});
    },
};
