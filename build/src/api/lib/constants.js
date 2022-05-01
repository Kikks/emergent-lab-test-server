"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = exports.PORT = exports.NODE_ENV = exports.corsWhitelist = void 0;
exports.corsWhitelist = ['*'];
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.PORT = _a.PORT;
exports.constants = {
    SUCCESSFUL: 'successful',
    COUNTRIES_BY_CODES_URL: 'https://restcountries.eu/rest/v2/alpha?codes=',
};
//# sourceMappingURL=constants.js.map