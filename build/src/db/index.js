"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Employee_1 = require("./entity/Employee");
const User_1 = require("./entity/User");
const env = process.env.NODE_ENV || 'production';
const environmentConfig = {
    development: {
        username: process.env.DEVELOPMENT_USERNAME,
        password: process.env.DEVELOPMENT_PASSWORD,
        database: process.env.DEVELOPMENT_DB,
        host: process.env.DEVELOPMENT_HOST,
        port: process.env.DEVELOPMENT_PORT,
    },
    test: {
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD,
        database: process.env.TEST_DB,
        host: process.env.TEST_HOST,
        port: process.env.TEST_PORT,
    },
    production: {
        username: process.env.PRODUCTION_USERNAME,
        password: process.env.PRODUCTION_PASSWORD,
        database: process.env.PRODUCTION_DB,
        host: process.env.PRODUCTION_HOST,
        port: process.env.PRODUCTION_PORT,
    },
};
console.log(environmentConfig[env]);
const AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    port: environmentConfig[env].port ? Number(environmentConfig[env].port) : undefined,
    host: environmentConfig[env].host,
    username: environmentConfig[env].username,
    password: environmentConfig[env].password,
    database: environmentConfig[env].database,
    synchronize: true,
    logging: false,
    entities: [Employee_1.Employee, User_1.User],
    migrations: [],
    subscribers: [],
});
exports.AppDataSource = AppDataSource;
const dataSource = AppDataSource.createQueryBuilder();
exports.dataSource = dataSource;
//# sourceMappingURL=index.js.map