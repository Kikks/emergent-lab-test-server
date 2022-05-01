"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = void 0;
const db_1 = require("../../db");
const User_1 = require("../../db/entity/User");
const error_1 = __importDefault(require("../lib/error"));
const getUser = ({ email }) => {
    const user = db_1.AppDataSource.createQueryBuilder()
        .select('user')
        .from(User_1.User, 'user')
        .where('user.email = :email', { email })
        .getOne();
    return user;
};
exports.getUser = getUser;
const createUser = async ({ email, firstName, lastName, password }) => {
    const existingUser = await db_1.AppDataSource.createQueryBuilder()
        .select('user')
        .from(User_1.User, 'user')
        .where('user.email = :email', { email })
        .getOne();
    if (existingUser) {
        throw new error_1.default('A user with that email already exists.', 400);
    }
    return db_1.AppDataSource.createQueryBuilder()
        .insert()
        .into(User_1.User)
        .values({
        email,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        password,
    })
        .execute();
};
exports.createUser = createUser;
//# sourceMappingURL=user.js.map