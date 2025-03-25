import { Model, Optional } from "sequelize";

interface VisitorAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;}

/*
  We have to declare the VisitorCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
interface VisitorCreationAttributes extends Optional<VisitorAttributes, "id" | "createdAt" | "updatedAt"> {}

interface VisitorInstance extends Model<VisitorAttributes, VisitorCreationAttributes>, VisitorAttributes {}
export { VisitorAttributes, VisitorCreationAttributes, VisitorInstance };
