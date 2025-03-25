if (!process.env.IS_NODE) require("ts-node/register");
require("../../config/env.config.ts");

module.exports = require("./config.ts").default;
