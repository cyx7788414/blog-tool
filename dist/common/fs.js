"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rm = require("rimraf");
const info_1 = require("./info");
const _success = (type, params, data) => {
    info_1.default.success(`${type} ${params.path} success`);
    if (params.success) {
        params.success(data);
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
    let data;
    try {
        data = func();
    }
    catch (err) {
        _error(type, params, err);
        return;
    }
    _success(type, params, data);
};
const _handleAsync = (type, params, err, data) => {
    if (err) {
        _error(type, params, err);
    }
    else {
        _success(type, params, data);
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
const readFile = (params) => {
    if (params.sync) {
        _handleSync('readFile', params, () => {
            return fs.readFileSync(params.path, params.option);
        });
    }
    else {
        fs.readFile(params.path, params.option, (err, data) => {
            _handleAsync('readFile', params, err, data);
        });
    }
};
const getStat = (params) => {
    if (params.sync) {
        _handleSync('getStat', params, () => {
            return fs.statSync(params.path);
        });
    }
    else {
        fs.stat(params.path, (err, data) => {
            _handleAsync('getStat', params, err, data);
        });
    }
};
const readDir = (params) => {
    if (params.sync) {
        _handleSync('readDir', params, () => {
            return fs.readdirSync(params.path);
        });
    }
    else {
        fs.readdir(params.path, (err, data) => {
            _handleAsync('readDir', params, err, data);
        });
    }
};
const rmDir = (params) => {
    if (params.sync) {
        _handleSync('rmDir', params, () => {
            return fs.rmdirSync(params.path);
        });
    }
    else {
        fs.rmdir(params.path, err => {
            _handleAsync('rmDir', params, err);
        });
    }
};
const rmDirRecur = (params) => {
    if (params.sync) {
        _handleSync('rmDirRecur', params, () => {
            return rm.sync(params.path, {});
        });
    }
    else {
        rm(params.path, {}, err => {
            _handleAsync('rmDirRecur', params, err);
        });
    }
};
const rmFile = (params) => {
    if (params.sync) {
        _handleSync('rmFile', params, () => {
            return fs.unlinkSync(params.path);
        });
    }
    else {
        fs.unlink(params.path, err => {
            _handleAsync('rmFile', params, err);
        });
    }
};
const fileOperation = {
    write: writeFile,
    mkdir: mkdir,
    read: readFile,
    stat: getStat,
    readdir: readDir,
    rmFile: rmFile,
    rmDir: rmDir,
    rmDirRecur: rmDirRecur
};
exports.default = fileOperation;
