import { DataTypes } from "sequelize";
import { sequelize } from ".";
import { IntegrationInstance } from "../interfaces/integration.interface";

const Integration = sequelize.define<IntegrationInstance>(
    "Integration",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            allowNull: false,
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true,
            },
        },
        logo: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        docs: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        live: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        clientId: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        clientSecret: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        displayName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        authPath: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        timestamps: true,
    }
);

export default Integration;
