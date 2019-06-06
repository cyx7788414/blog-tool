"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const infoOperation = {
    log: (str) => {
        console.log(str);
    },
    warn: (str) => {
        console.warn(chalk_1.default.yellow(str));
    },
    error: (str) => {
        console.error(chalk_1.default.red(str));
    },
    success: (str) => {
        console.info(chalk_1.default.green(str));
    }
};
exports.default = infoOperation;
