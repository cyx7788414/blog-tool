"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("./fs");
const info_1 = require("./info");
const common_1 = require("../common/common");
const attrMap = {
    name: {
        'type': 'types',
        'tag': 'tags'
    },
    value: {
        'types': 'type',
        'tags': 'tag'
    },
    get: (str) => {
        return attrMap.name[str] || attrMap.value[str] || '';
    }
};
const checkInvalidDate = (date) => {
    return date && Number.isNaN(new Date(date).getTime());
};
const isDirectory = (path) => {
    let stat;
    fs_1.default.stat({
        path: path,
        sync: true,
        success: (data) => {
            stat = data;
        }
    });
    return stat ? stat.isDirectory() : false;
};
const isFile = (path) => {
    let stat;
    fs_1.default.stat({
        path: path,
        sync: true,
        success: (data) => {
            stat = data;
        }
    });
    return stat.isFile();
};
const initializableCheck = (path) => {
    if (!isDirectory(path)) {
        info_1.default.warn('Invalid Path');
        return;
    }
    let files = [];
    fs_1.default.readdir({
        path: path,
        sync: true,
        success: (list) => {
            files = list;
        }
    });
    //    if (files.includes('index.json') || files.includes('articles') || files.includes('version.json')) {
    if (files.includes('index.json') || files.includes('articles')) {
        return false;
    }
    return true;
};
const initializedCheck = (path) => {
    if (!isDirectory(path)) {
        info_1.default.warn('Invalid Path');
        return;
    }
    let files = [];
    fs_1.default.readdir({
        path: path,
        sync: true,
        success: (list) => {
            files = list;
        }
    });
    //    if (files.includes('index.json') && files.includes('articles') && files.includes('version.json')) {
    if (files.includes('index.json') && files.includes('articles')) {
        return true;
    }
    return false;
};
const updatableCheck = (path) => {
    if (!isDirectory(path)) {
        info_1.default.warn('Invalid Path');
        return;
    }
    let files = [];
    fs_1.default.readdir({
        path: path,
        sync: true,
        success: (list) => {
            files = list;
        }
    });
    if (files.includes('article.md')) {
        return true;
    }
    return false;
};
const writeIndexFile = (indexPath, indexObj, success, error) => {
    common_1.default.fs.write({
        path: indexPath,
        str: JSON.stringify(indexObj),
        success: () => {
            if (success) {
                try {
                    success();
                }
                catch (e) {
                    console.log(e);
                }
            }
        },
        error: (err) => {
            if (err) {
                try {
                    error(err);
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
    });
};
const toolOperation = {
    attrMap: attrMap,
    checkInvalidDate: checkInvalidDate,
    isDirectory: isDirectory,
    isFile: isFile,
    initializableCheck: initializableCheck,
    initializedCheck: initializedCheck,
    updatableCheck: updatableCheck,
    writeIndex: writeIndexFile
};
exports.default = toolOperation;
