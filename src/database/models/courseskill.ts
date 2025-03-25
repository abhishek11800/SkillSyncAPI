import { DataTypes } from "sequelize";
import { sequelize } from ".";
import { CourseSkillInstance } from "../interfaces/course-skill.interface";

const CourseSkill = sequelize.define<CourseSkillInstance>(
    "CourseSkill",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        skillId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "Skill",
                key: "id",
            },
        },
        courseId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "Course",
                key: "id",
            },
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

export default CourseSkill;
