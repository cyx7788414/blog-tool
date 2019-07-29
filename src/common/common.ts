import fileOperation from './fs';
import infoOperation from './info';
import toolOperation from './tool';
import inquirerOperation from './inquirer';
import editOperation from './edit';
import dataSource from './data';

const common = {
    fs: fileOperation,
    info: infoOperation,
    tool: toolOperation,
    inquirer: inquirerOperation,
    edit: editOperation,
    data: dataSource
};

export default common;