import { DataTypes } from "sequelize";
import { sequelize } from ".";
import { CourseInstance } from "../interfaces/course.interface";

const Course = sequelize.define<CourseInstance>(
    "Course",
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
        duration: {
            allowNull: true,
            type: DataTypes.DECIMAL,
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

export default Course;
