import * as inquirer from 'inquirer';

const makeQuestion = async (queryList: inquirer.Questions): Promise<any> => {
    return inquirer.prompt(queryList);
};

const inquirerOperation = {
    make: makeQuestion
};

export default inquirerOperation;