import * as inquirer from 'inquirer';
declare const inquirerOperation: {
    make: (queryList: inquirer.QuestionCollection<inquirer.Answers>) => Promise<any>;
};
export default inquirerOperation;
