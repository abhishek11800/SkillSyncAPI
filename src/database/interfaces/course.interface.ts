import { Model, Optional } from "sequelize";

interface CourseAttributes {
    id: number;
    title: string;
    description: string;
    duration: number;
    createdAt: Date;
    updatedAt: Date;}

/*
  We have to declare the CourseCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
interface CourseCreationAttributes extends Optional<CourseAttributes, "id" | "createdAt" | "updatedAt"> {}

interface CourseInstance extends Model<CourseAttributes, CourseCreationAttributes>, CourseAttributes {}
export { CourseAttributes, CourseCreationAttributes, CourseInstance };
