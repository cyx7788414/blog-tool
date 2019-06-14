declare const toolOperation: {
    isDirectory: (path: string) => boolean;
    isFile: (path: string) => boolean;
    initializableCheck: (path: string) => boolean;
    initializedCheck: (path: string) => boolean;
    updatableCheck: (path: string) => boolean;
};
export default toolOperation;
