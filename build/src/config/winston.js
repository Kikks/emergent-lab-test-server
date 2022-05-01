"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const app_root_path_1 = __importDefault(require("app-root-path"));
const winston_1 = __importDefault(require("winston"));
const timestamp = Date.now();
const options = {
    file: {
        level: 'info',
        filename: `${app_root_path_1.default}/logs/cache-${timestamp}.log`,
        handleExceptions: true,
        json: true,
        timestamp: true,
        maxsize: 2097152,
        maxFiles: 5,
        colorize: false,
    },
    timestamp: true,
    console: {
        level: 'info',
        timestamp: () => Date.now(),
        formatter: function (opts) {
            return (winston_1.default.config.colorize(opts.level, opts.timestamp()) +
                ' ' +
                winston_1.default.config.colorize(opts.level, opts.level.toUpperCase()) +
                ' ' +
                (opts.message ? opts.message : ''));
        },
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
const logger = new winston_1.default.Logger({
    transports: [
        new winston_1.default.transports.File(options.file),
        new winston_1.default.transports.Console(options.console),
    ],
    exitOnError: false, // do not exit on handled exceptions
});
exports.logger = logger;
logger.stream = {
    write: function (message, encoding) {
        logger.info(message, encoding);
    },
};
//# sourceMappingURL=winston.js.map