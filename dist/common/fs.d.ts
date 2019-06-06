/// <reference types="node" />
import * as fs from 'fs';
declare const fileOperation: {
    write: (params: {
        path: string;
        str: string;
        success?: Function;
        error?: Function;
        sync?: boolean;
        option?: fs.WriteFileOptions;
    }) => void;
    mkdir: (params: {
        path: string;
        success?: Function;
        error?: Function;
        sync?: boolean;
        option?: fs.MakeDirectoryOptions;
    }) => void;
};
export default fileOperation;
