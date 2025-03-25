import { Options, Sequelize } from "sequelize";
import { DbEnvironment } from "../../common/types/db-env.type";
import DB_CONFIG from "../config/config";

const env = (process.env.NODE_ENV as DbEnvironment) || "development";
const config = DB_CONFIG[env];

const sequelize = config.url
    ? new Sequelize(config.url, config as Options)
    : new Sequelize(
          config.database!,
          config.username!,
          config.password,
          config as Options
      );

export { Sequelize, sequelize };
