import fileOperation from './fs';
import infoOperation from './info';
import toolOperation from './tool';
import inquirerOperation from './inquirer';

const common = {
    fs: fileOperation,
    info: infoOperation,
    tool: toolOperation,
    inquirer: inquirerOperation
};

export default common;