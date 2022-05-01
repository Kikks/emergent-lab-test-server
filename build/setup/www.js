"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
/** Module dependencies. */
require("./envConfig");
const app_root_path_1 = __importDefault(require("app-root-path"));
const fs = __importStar(require("fs"));
const http = __importStar(require("http"));
const constants_1 = require("../src/api/lib/constants");
const app_1 = require("../src/app");
const winston_1 = require("../src/config/winston");
const db_1 = require("../src/db");
/** Create log file */
try {
    fs.mkdir(`${app_root_path_1.default}/logs/`, (error) => {
        if (!error || error.code === 'EEXIST' || error.errno === -17) {
            fs.open(`${app_root_path_1.default}/logs/${winston_1.logger.transports.file.filename}`, 'w', (err, fd) => {
                if (fd) {
                    fs.close(fd, (e) => {
                        if (!e) {
                            winston_1.logger.info(`Log file ${fd} created successfully`);
                        }
                    });
                }
            });
        }
    });
}
catch (e) {
    winston_1.logger.error('Error occurred in creating log file:: ', e);
}
/** Normalize a port into a number, string, or false. */
const normalizePort = (val) => {
    const connPort = parseInt(val, 10);
    return connPort >= 0 ? connPort : isNaN(connPort) ? 9999 : 0;
};
/** Event listener for HTTP server "error" event. */
const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            winston_1.logger.error(`${error.code}: ${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            winston_1.logger.error(`${error.code}: ${bind} is already in use`);
            process.exit(1);
            break;
        default:
            winston_1.logger.error(`${error.code}: an unknow error occured.`);
            throw error;
    }
};
const nodeEnv = constants_1.NODE_ENV;
const port = normalizePort(constants_1.PORT || '5000');
/** Event listener for HTTP server "listening" event. */
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr === null || addr === void 0 ? void 0 : addr.port}`;
    if (process.env.NODE_ENV !== 'test') {
        winston_1.logger.info(`Listening on ${bind} in ${nodeEnv} environment`);
    }
};
/** Initialize api service */
const api = new app_1.EmergentLabAPI();
const app = api.app;
app.set('port', port);
/** Create HTTP server. */
const server = http.createServer(app);
exports.server = server;
db_1.AppDataSource.initialize()
    .then(() => {
    winston_1.logger.info('Connected to database');
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
})
    .catch((error) => {
    console.log(error);
    winston_1.logger.error(error);
});
//# sourceMappingURL=www.js.map