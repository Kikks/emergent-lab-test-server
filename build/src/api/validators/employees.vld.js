"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmployeeData = void 0;
const fp_1 = require("lodash/fp");
const response_1 = require("../lib/response");
const returnFailure = (error, res) => {
    return (0, response_1.failure)({
        res,
        message: error,
        httpCode: 400,
    });
};
const validateEmployeeData = (req, res, next) => {
    if ((0, fp_1.isEmpty)(req.body)) {
        return returnFailure('Empty request body', res);
    }
    const { email, firstName, lastName, phoneNumber, role } = req.body;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || email.trim() === '') {
        return returnFailure('Email must not be empty', res);
    }
    else if (!email.match(regex)) {
        return returnFailure('Invalid Email supplied', res);
    }
    if (!firstName || firstName.trim() === '') {
        return returnFailure('First Name must not be empty', res);
    }
    if (!lastName || lastName.trim() === '') {
        return returnFailure('Last Name must not be empty', res);
    }
    if (!phoneNumber || phoneNumber.trim() === '') {
        return returnFailure('Phone number must not be empty', res);
    }
    const roles = ['admin', 'staff'];
    if (!role || role.trim() === '') {
        return returnFailure('Role must not be empty', res);
    }
    else if (!roles.includes(role)) {
        return returnFailure('Invalid Role supllied', res);
    }
    return next();
};
exports.validateEmployeeData = validateEmployeeData;
//# sourceMappingURL=employees.vld.js.map