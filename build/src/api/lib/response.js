"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = void 0;
const SUCCESSFUL = 'successful';
const respond = ({ res, status, httpCode, data }) => {
    const response = {
        status,
        data: data.data,
        message: data.message,
    };
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Method', '*');
    return res.status(httpCode).send(response);
};
const success = ({ res, data, message, httpCode }) => {
    const dataToSend = {
        data,
        message: message || SUCCESSFUL,
    };
    return respond({ res, status: true, httpCode, data: dataToSend });
};
exports.success = success;
const failure = ({ res, message, errStack, httpCode }) => {
    const dataToSend = {
        message,
        errStack,
    };
    return respond({
        res,
        status: false,
        httpCode: isNaN(httpCode) ? 500 : httpCode,
        data: dataToSend,
    });
};
exports.failure = failure;
//# sourceMappingURL=response.js.map