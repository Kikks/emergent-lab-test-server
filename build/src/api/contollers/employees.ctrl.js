"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteEmployee = exports.handleUpdateEmployee = exports.handleAddEmployee = exports.handleGetEmployees = void 0;
const constants_1 = require("../lib/constants");
const response_1 = require("../lib/response");
const employees_1 = require("../services/employees");
const { SUCCESSFUL } = constants_1.constants;
const handleGetEmployees = async (req, res) => {
    try {
        const { search, page, limit } = req.query;
        const data = await (0, employees_1.getEmployees)({
            search,
            page,
            limit,
        });
        return (0, response_1.success)({
            res,
            data: {
                employees: data[0],
                page,
                total: data[1],
            },
            message: SUCCESSFUL,
            httpCode: 200,
        });
    }
    catch (error) {
        return (0, response_1.failure)({
            res,
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Error fetching employess.',
            errStack: error === null || error === void 0 ? void 0 : error.stack,
            httpCode: (error === null || error === void 0 ? void 0 : error.code) || 500,
        });
    }
};
exports.handleGetEmployees = handleGetEmployees;
const handleAddEmployee = async (req, res) => {
    try {
        const { email, firstName, lastName, phoneNumber, role } = req.body;
        await (0, employees_1.createEmployee)({
            email,
            firstName,
            lastName,
            phoneNumber,
            role,
        });
        return (0, response_1.success)({
            res,
            data: 'Employee created succesfully',
            message: SUCCESSFUL,
            httpCode: 201,
        });
    }
    catch (error) {
        return (0, response_1.failure)({
            res,
            message: error.message || 'Error adding employee',
            errStack: error.stack,
            httpCode: error.code || 500,
        });
    }
};
exports.handleAddEmployee = handleAddEmployee;
const handleUpdateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, firstName, lastName, phoneNumber, role } = req.body;
        await (0, employees_1.updateEmployee)({
            id,
            data: { email, firstName, lastName, phoneNumber, role },
        });
        return (0, response_1.success)({
            res,
            data: 'Employee updated successfuly.',
            message: SUCCESSFUL,
            httpCode: 200,
        });
    }
    catch (error) {
        return (0, response_1.failure)({
            res,
            message: error.message || 'Error updating employee',
            errStack: error.stack,
            httpCode: error.code || 500,
        });
    }
};
exports.handleUpdateEmployee = handleUpdateEmployee;
const handleDeleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await (0, employees_1.deleteEmployee)({
            id,
        });
        return (0, response_1.success)({
            res,
            data: 'Employee deleted successfuly.',
            message: SUCCESSFUL,
            httpCode: 200,
        });
    }
    catch (error) {
        return (0, response_1.failure)({
            res,
            message: error.message || 'Error deleting employee',
            errStack: error.stack,
            httpCode: error.code || 500,
        });
    }
};
exports.handleDeleteEmployee = handleDeleteEmployee;
//# sourceMappingURL=employees.ctrl.js.map