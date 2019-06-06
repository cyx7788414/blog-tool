"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const info_1 = require("./info");
const _success = (type, params) => {
    info_1.default.success(`${type} ${params.path} success`);
    if (params.success) {
        params.success();
    }
};
const _error = (type, params, err) => {
    info_1.default.error(`${type} ${params.path} error`);
    info_1.default.log(err.toString());
    if (params.error) {
        params.error(err);
    }
};
const _handleSync = (type, params, func) => {
    try {
        func();
    }
    catch (err) {
        _error(type, params, err);
        return;
    }
    _success(type, params);
};
const _handleAsync = (type, params, err) => {
    if (err) {
        _error(type, params, err);
    }
    else {
        _success(type, params);
    }
};
const writeFile = (params) => {
    if (params.sync) {
        _handleSync('writeFile', params, () => {
            fs.writeFileSync(params.path, params.str, params.option);
        });
    }
    else {
        fs.writeFile(params.path, params.str, err => {
            _handleAsync('writeFile', params, err);
        });
    }
};
const mkdir = (params) => {
    if (params.sync) {
        _handleSync('mkdir', params, () => {
            fs.mkdirSync(params.path, params.option);
        });
    }
    else {
        fs.mkdir(params.path, params.option, err => {
            _handleAsync('mkdir', params, err);
        });
    }
};
const fileOperation = {
    write: writeFile,
    mkdir: mkdir
};
exports.default = fileOperation;
