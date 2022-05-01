"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRegister = exports.handleLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const constants_1 = require("../lib/constants");
const error_1 = __importDefault(require("../lib/error"));
const response_1 = require("../lib/response");
const token_1 = require("../lib/token");
const user_1 = require("../services/user");
const { SUCCESSFUL } = constants_1.constants;
const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await (0, user_1.getUser)({
            email,
        });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            throw new error_1.default('User does not exist or invalid login details.', 404);
        }
        const userData = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
        };
        return (0, response_1.success)({
            res,
            data: {
                user: userData,
                token: (0, token_1.generateToken)(userData),
            },
            message: SUCCESSFUL,
            httpCode: 200,
        });
    }
    catch (error) {
        return (0, response_1.failure)({
            res,
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Error loggin in.',
            errStack: error === null || error === void 0 ? void 0 : error.stack,
            httpCode: (error === null || error === void 0 ? void 0 : error.code) || 500,
        });
    }
};
exports.handleLogin = handleLogin;
const handleRegister = async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;
        await (0, user_1.createUser)({
            email,
            firstName,
            lastName,
            password: await bcryptjs_1.default.hash(password, 12),
        });
        return (0, response_1.success)({
            res,
            data: 'User created succesfully',
            message: SUCCESSFUL,
            httpCode: 201,
        });
    }
    catch (error) {
        return (0, response_1.failure)({
            res,
            message: error.message || 'Error registering user',
            errStack: error.stack,
            httpCode: error.code || 500,
        });
    }
};
exports.handleRegister = handleRegister;
//# sourceMappingURL=user.ctrl.js.map