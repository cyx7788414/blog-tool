import * as fs from 'fs';
import infoOperation from './info';

const _success = (type: string, params: {
    path: string,
    success?: Function
}, data?: Buffer): void => {
    infoOperation.success(`${type} ${params.path} success`);
    if (params.success) {
        params.success(data);
    }
};

const _error = (type: string, params: {
    path: string,
    error?: Function
}, err: NodeJS.ErrnoException): void => {
    infoOperation.error(`${type} ${params.path} error`);
    infoOperation.log(err.toString());
    if (params.error) {
        params.error(err);
    }
}

const _handleSync = (type: string, params: {
    path: string,
    success?: Function,
    error?: Function
}, func: Function): void => {
    let data;
    try {
        data = func();
    } catch(err) {
        _error(type, params, err);
        return;
    }
    _success(type, params, data);
};

const _handleAsync = (type: string, params: {
    path: string,
    success?: Function,
    error?: Function,
}, err: NodeJS.ErrnoException, data?: Buffer): void => {
    if (err) {
        _error(type, params, err);
    } else {
        _success(type, params, data);
    }
};

const writeFile = (params: {
    path: string, 
    str: string, 
    success?: Function, 
    error?: Function,
    sync?: boolean,
    option?: fs.WriteFileOptions
}): void => {
    if (params.sync) {
        _handleSync('writeFile', params, () => {
            fs.writeFileSync(params.path, params.str, params.option);
        });
    } else {
        fs.writeFile(params.path, params.str, err => {
            _handleAsync('writeFile', params, err);
        });
    }
};

const mkdir = (params: {
    path: string,
    success?: Function,
    error?: Function
    sync?: boolean,
    option?: fs.MakeDirectoryOptions
}): void => {
    if (params.sync) {
        _handleSync('mkdir', params, () => {
            fs.mkdirSync(params.path, params.option);
        });
    } else {
        fs.mkdir(params.path, params.option, err => {
            _handleAsync('mkdir', params, err);
        });
    }
};

const readFile = (params: {
    path: string,
    success?: Function,
    error?: Function
    sync?: boolean,
    option?: {
        encoding?: null;
        flag?: string;
    }
}): void => {
    if (params.sync) {
        _handleSync('readFile', params, () => {
            return fs.readFileSync(params.path, params.option);
        });
    } else {
        fs.readFile(params.path, params.option, (err, data) => {
            _handleAsync('readFile', params, err, data);
        });
    }
};

const fileOperation = {
    write: writeFile,
    mkdir: mkdir,
    read: readFile
};

export default fileOperation;