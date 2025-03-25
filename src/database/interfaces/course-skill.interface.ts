import { Model, Optional } from "sequelize";

interface CourseSkillAttributes {
    id: number;
    skillId: number;
    courseId: number;
    createdAt: Date;
    updatedAt: Date;}

/*
  We have to declare the CourseSkillCreationAttributes to
  tell aSequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
interface CourseSkillCreationAttributes extends Optional<CourseSkillAttributes, "id" | "createdAt" | "updatedAt"> {}

interface CourseSkillInstance extends Model<CourseSkillAttributes, CourseSkillCreationAttributes>, CourseSkillAttributes {}
export { CourseSkillAttributes, CourseSkillCreationAttributes, CourseSkillInstance };
