"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmergentLabError extends Error {
    constructor(message, code = 500) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.status = code;
    }
}
exports.default = EmergentLabError;
//# sourceMappingURL=error.js.map