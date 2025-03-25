import { Model, Optional } from "sequelize";

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;}

/*
  We have to declare the UserCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
interface UserCreationAttributes extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}
export { UserAttributes, UserCreationAttributes, UserInstance };
