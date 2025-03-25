import { Model, Optional } from "sequelize";

interface SkillAttributes {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;}

/*
  We have to declare the SkillCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
interface SkillCreationAttributes extends Optional<SkillAttributes, "id" | "createdAt" | "updatedAt"> {}

interface SkillInstance extends Model<SkillAttributes, SkillCreationAttributes>, SkillAttributes {}
export { SkillAttributes, SkillCreationAttributes, SkillInstance };
