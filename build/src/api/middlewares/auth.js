"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../lib/response");
const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        try {
            const user = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            res.locals.user = user;
            return next();
        }
        catch (error) {
            return (0, response_1.failure)({
                message: 'Invalid/Expired Token.',
                httpCode: 403,
                res,
            });
        }
    }
    else {
        return (0, response_1.failure)({
            message: 'Authentication header must be provided.',
            httpCode: 403,
            res,
        });
    }
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=auth.js.map