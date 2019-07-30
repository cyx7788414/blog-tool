import Index from '../class/index';
declare const toolOperation: {
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
    writeIndex: (indexPath: string, indexObj: Index, success?: Function, error?: Function) => void;
};
export default toolOperation;
