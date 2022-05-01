"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
require("../../setup/envConfig");
const employees_ctrl_1 = require("./contollers/employees.ctrl");
const user_ctrl_1 = require("./contollers/user.ctrl");
const auth_1 = require("./middlewares/auth");
const employees_vld_1 = require("./validators/employees.vld");
const user_vld_1 = require("./validators/user.vld");
const routes = (app) => {
    app.get('/', (req, res) => res.status(200).json({ message: 'ok' }));
    app.post('/user', user_vld_1.validateUserData, user_ctrl_1.handleRegister);
    app.post('/user/login', user_vld_1.validateLoginData, user_ctrl_1.handleLogin);
    app.get('/employee', auth_1.checkAuth, employees_ctrl_1.handleGetEmployees);
    app.post('/employee', auth_1.checkAuth, employees_vld_1.validateEmployeeData, employees_ctrl_1.handleAddEmployee);
    app.patch('/employee/:id', auth_1.checkAuth, employees_vld_1.validateEmployeeData, employees_ctrl_1.handleUpdateEmployee);
    app.delete('/employee/:id', auth_1.checkAuth, employees_ctrl_1.handleDeleteEmployee);
    return app;
};
exports.routes = routes;
//# sourceMappingURL=routes.js.map