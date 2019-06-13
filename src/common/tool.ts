import * as path from 'path';
import * as fs from 'fs';
import fsOperation from './fs';
import infoOperation from './info';

const isDirectory = (path: string): boolean => {
    let stat: fs.Stats;
    fsOperation.stat({
        path: path,
        sync: true,
        success: (data: fs.Stats) => {
            stat = data;
        }
    });
    return stat.isDirectory();
};

const isFile = (path: string): boolean => {
    let stat: fs.Stats;
    fsOperation.stat({
        path: path,
        sync: true,
        success: (data: fs.Stats) => {
            stat = data;
        }
    });
    return stat.isFile();
};

const initializableCheck = (path: string): boolean => {
    if (!isDirectory(path)) {
        infoOperation.warn('Invalid Path');
        return;
    }
    let files: string[] = [];
    fsOperation.readdir({
        path: path,
        sync: true,
        success: (list: string[]) => {
            files = list;
        }
    });
//    if (files.includes('index.json') || files.includes('articles') || files.includes('version.json')) {
    if (files.includes('index.json') || files.includes('articles')) {
        return false;
    }
    return true;
};

const initializedCheck = (path: string): boolean => {
    if (!isDirectory(path)) {
        infoOperation.warn('Invalid Path');
        return;
    }
    let files: string[] = [];
    fsOperation.readdir({
        path: path,
        sync: true,
        success: (list: string[]) => {
            files = list;
        }
    });
//    if (files.includes('index.json') && files.includes('articles') && files.includes('version.json')) {
    if (files.includes('index.json') && files.includes('articles')) {
        return true;
    }
    return false;
};

const updatableCheck = (path: string): boolean => {
    if (!isDirectory(path)) {
        infoOperation.warn('Invalid Path');
        return;
    }
    let files: string[] = [];
    fsOperation.readdir({
        path: path,
        sync: true,
        success: (list: string[]) => {
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

export default toolOperation;