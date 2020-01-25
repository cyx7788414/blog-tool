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
        rmFile: (params: {
            path: string;
            success?: Function;
            error?: Function;
            sync?: boolean;
        }) => void;
        rmDir: (params: {
            path: string;
            success?: Function;
            error?: Function;
            sync?: boolean;
        }) => void;
        rmDirRecur: (params: {
            path: string;
            success?: Function;
            error?: Function;
            sync?: boolean;
        }) => void;
    };
    info: {
        log: (str: string) => void;
        warn: (str: string) => void;
        error: (str: string) => void;
        success: (str: string) => void;
    };
    tool: {
        attrMap: {
            name: any;
            value: any;
            get: Function;
        };
        checkInvalidDate: (date: string) => boolean;
        isDirectory: (path: string) => boolean;
        isFile: (path: string) => boolean;
        initializableCheck: (path: string) => boolean;
        initializedCheck: (path: string) => boolean;
        updatableCheck: (path: string) => boolean;
        writeIndex: (indexPath: string, indexObj: import("../class").default, success?: Function, error?: Function) => void;
    };
    inquirer: {
        make: (queryList: import("inquirer").QuestionCollection<import("inquirer").Answers>) => Promise<any>;
    };
    edit: {
        initForm: (indexObj: import("../class").default, target?: import("../class/article").default) => Promise<import("../class/answer").default>;
        checkAnswer: (indexObj: import("../class").default, answer: import("../class/answer").default) => import("../class/cleananswer").default;
        makeSure: (argv: any, answer: import("../class/cleananswer").default, target?: import("../class/article").default) => Promise<{
            makesure: boolean;
        }>;
        editArticleItemPrepare: (argv: any, callback: Function) => void;
    };
    data: {
        statusList: any[];
    };
};
export default common;
