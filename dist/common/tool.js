"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("./fs");
const info_1 = require("./info");
const isDirectory = (path) => {
    let stat;
    fs_1.default.stat({
        path: path,
        sync: true,
        success: (data) => {
            stat = data;
        }
    });
    return stat.isDirectory();
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
const toolOperation = {
    isDirectory: isDirectory,
    isFile: isFile,
    initializableCheck: initializableCheck,
    initializedCheck: initializedCheck,
    updatableCheck: updatableCheck
};
exports.default = toolOperation;
