import * as path from 'path';
import * as fs from 'fs';
import fsOperation from './fs';
import infoOperation from './info';
import Index from '../class/index';
import common from '../common/common';

const attrMap: {
    name: any,
    value: any,
    get: Function
} = {
    name: {
        'type': 'types',
        'tag': 'tags'
    },
    value: {
        'types': 'type',
        'tags': 'tag'
    },
    get: (str: string) => {
        return attrMap.name[str] || attrMap.value[str] || '';
    }
};

const checkInvalidDate = (date: string): boolean => {
    return date && Number.isNaN(new Date(date).getTime());
};

const isDirectory = (path: string): boolean => {
    let stat: fs.Stats;
    fsOperation.stat({
        path: path,
        sync: true,
        success: (data: fs.Stats) => {
            stat = data;
        }
    });
    return stat?stat.isDirectory():false;
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

const writeIndexFile = (indexPath: string, indexObj: Index, success?: Function, error?: Function) => {
    common.fs.write({
        path: indexPath,
        str: JSON.stringify(indexObj),
        success: () => {
            if (success) {
                try {
                    success();
                } catch(e) {
                    console.log(e);
                }
            }
        },
        error: (err: any) => {
            if (err) {
                try {
                    error(err);
                } catch(e) {
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

export default toolOperation;