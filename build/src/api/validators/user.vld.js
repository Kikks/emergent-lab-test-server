"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginData = exports.validateUserData = void 0;
const fp_1 = require("lodash/fp");
const response_1 = require("../lib/response");
const returnFailure = (error, res) => {
    return (0, response_1.failure)({
        res,
        message: error,
        httpCode: 400,
    });
};
const validateLoginData = (req, res, next) => {
    if ((0, fp_1.isEmpty)(req.body)) {
        return returnFailure('Empty request body', res);
    }
    const { email, password } = req.body;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || email.trim() === '') {
        return returnFailure('Email must not be empty', res);
    }
    else if (!email.match(regex)) {
        return returnFailure('Invalid Email supplied', res);
    }
    if (!password || password.trim() === '') {
        return returnFailure('Password must not be empty', res);
    }
    return next();
};
exports.validateLoginData = validateLoginData;
const validateUserData = (req, res, next) => {
    if ((0, fp_1.isEmpty)(req.body)) {
        return returnFailure('Empty request body', res);
    }
    const { email, firstName, lastName, password } = req.body;
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
    if (!password || password.trim() === '') {
        return returnFailure('Password must not be empty', res);
    }
    else if (password.length < 8) {
        return returnFailure('Password must not be less thatn 8 characters', res);
    }
    return next();
};
exports.validateUserData = validateUserData;
//# sourceMappingURL=user.vld.js.map