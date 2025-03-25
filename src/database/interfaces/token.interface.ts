import { BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, HasOneGetAssociationMixin, Model, Optional } from "sequelize";
import { UserInstance } from "./user.interface";

interface TokenAttributes {
    id: number;
    userId: number;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

/*
  We have to declare the TokenCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
interface TokenCreationAttributes extends Optional<TokenAttributes, "id" | "createdAt" | "updatedAt"> {}

interface TokenInstance extends Model<TokenAttributes, TokenCreationAttributes>, TokenAttributes {
  getUser(): BelongsToGetAssociationMixin<UserInstance>;
}

export { TokenAttributes, TokenCreationAttributes, TokenInstance };
