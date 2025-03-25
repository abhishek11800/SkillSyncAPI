import { Model, Optional } from "sequelize";

interface IntegrationAttributes {
    id: number;
    title: string,
    description: string,
    logo: string,
    docs: string,
    live: boolean,
    clientId: string,
    clientSecret: string,
    displayName: string,
    authPath: string,
    createdAt: Date;
    updatedAt: Date;
}

/*
  We have to declare the IntegrationCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
interface IntegrationCreationAttributes extends Optional<IntegrationAttributes, "id" | "createdAt" | "updatedAt"> {}

interface IntegrationInstance extends Model<IntegrationAttributes, IntegrationCreationAttributes>, IntegrationAttributes {}
export { IntegrationAttributes, IntegrationCreationAttributes, IntegrationInstance };
