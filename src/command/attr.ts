import * as yargs from 'yargs';
import common from '../common/common';

const attr = async (argv: yargs.Arguments<any>): Promise<void> => {
    console.log(argv);
    let answer: Promise<string> = await common.inquirer.make([
        {
            type: 'list',
            name: 'target',
            message: 'please choice the target',
            choices: [
                'type',
                'tag'
            ]
        }
    ]);
};

export default attr;