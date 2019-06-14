import * as inquirer from 'inquirer';
declare const inquirerOperation: {
    make: (queryList: inquirer.Questions<Record<string, any>>) => Promise<any>;
};
export default inquirerOperation;
