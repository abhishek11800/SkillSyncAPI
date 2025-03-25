import { DbConfig } from "../../common/types/db-config.type";
import { DbEnvironment } from "../../common/types/db-env.type";

const DB_CONFIG : Record<DbEnvironment, DbConfig> = {
    development: {
        url: process.env.DEV_DATABASE_URL,
        dialect: "postgres",
    },
    test: {
        url: process.env.TEST_DATABASE_URL,
        dialect: "postgres",
    },
    production: {
        url: process.env.PROD_DATABASE_URL,
        dialect: "postgres",
    },
};

export default DB_CONFIG;
