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
    read: (params: {
        path: string;
        success?: Function;
        error?: Function;
        sync?: boolean;
        option?: {
            encoding?: null;
            flag?: string;
        };
    }) => void;
    stat: (params: {
        path: string;
        success?: Function;
        error?: Function;
        sync?: boolean;
    }) => void;
    readdir: (params: {
        path: string;
        success?: Function;
        error?: Function;
        sync?: boolean;
    }) => void;
};
export default fileOperation;
