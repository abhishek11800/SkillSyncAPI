# SkillSyncAPI

##### Packages used:

* **sequelize v6**: ORM Tool [V6](https://sequelize.org/docs/v6/)
* **cors**: To handle CORS policy
* **dotenv**: To automatically load .env file
* **express**: Web API Framework
* **bullmq**: Background Job Processing
* **Redis**: Background Job Queues and Caching
* **swagger**: API Doc and API Testing [VS code extension](https://42crunch.com/tutorial-openapi-swagger-extension-vs-code/)

##### References:

* [how-to-create-a-rest-api-with-node-js-and-express](https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/)
* [how-to-set-up-node-typescript-express/](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)
* [Sequelize v7 Docs](https://sequelize.org/docs/v7): Not using as it's alpha version
* [getting-started V6](https://sequelize.org/docs/v6/getting-started/), [V6 Model Basics Docs](https://sequelize.org/docs/v6/core-concepts/model-basics/)
* [authenticate-rest-apis-in-node-js-using-jwt-json-web-tokens-f0e97669aad3](https://medium.com/@prashantramnyc/authenticate-rest-apis-in-node-js-using-jwt-json-web-tokens-f0e97669aad3)
* [ts authentication and authorization](https://medium.com/@rahulrulz680/nodejs-typescript-authentication-and-authorization-10728722ba6b)
* [crud-rest-api-node-js-express-postgresql/](https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/)
* [Sequelize v7 cli](https://sequelize.org/docs/v7/cli/)
* [getting-started-with-sequelize-and-postgres-emp](https://dev.to/nedsoft/getting-started-with-sequelize-and-postgres-emp)
* [power-of-advanced-error-handling-techniques-in-node-js-44d53cda3c61](https://medium.com/@vickypaiyaa/power-of-advanced-error-handling-techniques-in-node-js-44d53cda3c61)
* [express-async-handler-2ae8210d2a3d](https://medium.com/@SahilSharma_SoftwareDeveloper/express-async-handler-2ae8210d2a3d)
* [BullMQ](https://docs.bullmq.io/), [BullMQ API Docs](https://api.docs.bullmq.io/)
* [Redis Installation](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/)

#### Local Setup:

1. Ensure postgres and redis is running in your system.
2. Install dependencies: `npm i`
3. Create database into Postgres: `createdb skillsync -U postgres`
4. Apply migrations into DB: `npx sequelize-cli db:migrate`
5. Seed Dummy Data (Optional): `npx sequelize-cli db:seed:all`, refer sequelize official docs for more information.

##### Environment Variables

```bash
export PORT=3000
export DB_HOST=localhost
export DB_PORT=5433
export DB_USER=postgres
export DB_PASSWORD=postgres
export DB_NAME=skillsync
export NODE_ENV=development
export DEV_DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5433/skillsync
export TEST_DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5433/skillsync
export PROD_DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5433/skillsync
```

##### Sequelize CLI Commands

```bash
# To run all seed
npx sequelize-cli db:seed:all

# To undo all seed
npx sequelize-cli db:seed:undo:all

# To run specific seed file
npx sequelize-cli db:seed --seed 20250316130937-Course.js

# To undo specific seed file
npx sequelize-cli db:seed:undo --seed 20250316130937-Course.js

# To run all pending migrations
npx sequelize-cli db:migrate

# To undo last migration
npx sequelize-cli db:migrate:undo

# To undo till some migration
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-users.js

# To undo all migrations
npx sequelize-cli db:migrate:undo:all

# To generate model
npx sequelize-cli model:generate --name ModelName --attributes column1:dataType,column2:dataType

# To generate seed
npx sequelize-cli seed:generate --name seed-name

# To generate migration
npx sequelize-cli migration:generate --name migration-skeleton

```
