/// <reference types="node" />
declare const common: {
    fs: {
        write: (params: {
            path: string;
            str: string;
            success?: Function;
            error?: Function;
            sync?: boolean;
            option?: import("fs").WriteFileOptions;
        }) => void;
        mkdir: (params: {
            path: string;
            success?: Function;
            error?: Function;
            sync?: boolean;
            option?: import("fs").MakeDirectoryOptions;
        }) => void;
    };
    info: {
        log: (str: string) => void;
        warn: (str: string) => void;
        error: (str: string) => void;
        success: (str: string) => void;
    };
};
export default common;
