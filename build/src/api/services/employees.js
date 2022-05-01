"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployees = void 0;
const db_1 = require("../../db");
const Employee_1 = require("../../db/entity/Employee");
const error_1 = __importDefault(require("../lib/error"));
const getEmployees = ({ search, page, limit }) => {
    const employees = db_1.AppDataSource.createQueryBuilder()
        .select('employee')
        .from(Employee_1.Employee, 'employee')
        .where('employee.fullName like :search', { search: `%${search ? String(search) : ''}%` })
        .skip(page && limit ? (page - 1) * limit : undefined)
        .take(limit)
        .orderBy('employee.id', 'DESC')
        .getManyAndCount();
    return employees;
};
exports.getEmployees = getEmployees;
const createEmployee = async ({ email, firstName, lastName, phoneNumber, role }) => {
    const existingEmployee = await db_1.AppDataSource.createQueryBuilder()
        .select('employee')
        .from(Employee_1.Employee, 'employee')
        .where('employee.email = :email', { email })
        .getOne();
    if (existingEmployee) {
        throw new error_1.default('A employee with that email already exists.', 400);
    }
    return db_1.AppDataSource.createQueryBuilder()
        .insert()
        .into(Employee_1.Employee)
        .values({
        email,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        phoneNumber,
        role,
    })
        .execute();
};
exports.createEmployee = createEmployee;
const updateEmployee = async ({ id, data: { email, firstName, lastName, phoneNumber, role }, }) => {
    const existingEmployee = await db_1.AppDataSource.createQueryBuilder()
        .select('employee')
        .from(Employee_1.Employee, 'employee')
        .where('employee.id = :id', { id })
        .getOne();
    if (!existingEmployee) {
        throw new error_1.default(`No employee with id: "${id}" exists.`, 404);
    }
    return db_1.AppDataSource.createQueryBuilder()
        .update(Employee_1.Employee)
        .set({
        email,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        phoneNumber,
        role,
    })
        .where('id = :id', { id })
        .execute();
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async ({ id }) => {
    const existingEmployee = await db_1.AppDataSource.createQueryBuilder()
        .select('employee')
        .from(Employee_1.Employee, 'employee')
        .where('employee.id = :id', { id })
        .getOne();
    if (!existingEmployee) {
        throw new error_1.default(`No employee with id: "${id}" exists.`, 404);
    }
    return db_1.AppDataSource.createQueryBuilder()
        .delete()
        .from(Employee_1.Employee)
        .where('id = :id', { id })
        .execute();
};
exports.deleteEmployee = deleteEmployee;
//# sourceMappingURL=employees.js.map