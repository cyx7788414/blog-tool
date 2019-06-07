import fileOperation from './fs';
import infoOperation from './info';
import toolOperation from './tool';

const common = {
    fs: fileOperation,
    info: infoOperation,
    tool: toolOperation
};

export default common;