"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("./fs");
const info_1 = require("./info");
const tool_1 = require("./tool");
const inquirer_1 = require("./inquirer");
const edit_1 = require("./edit");
const common = {
    fs: fs_1.default,
    info: info_1.default,
    tool: tool_1.default,
    inquirer: inquirer_1.default,
    edit: edit_1.default
};
exports.default = common;
