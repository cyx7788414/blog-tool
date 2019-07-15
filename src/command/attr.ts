import * as yargs from 'yargs';
import common from '../common/common';

const attr = async (argv: yargs.Arguments<any>): Promise<void> => {
    console.log(argv);
    let answer = await common.inquirer.make([
        {
            type: 'list',
            name: 'target',
            message: 'please choice the target',
            choices: [
                {
                    name: 'type',
                    value: 'types'
                },
                {
                    name: 'tag',
                    value: 'tags'
                }
            ]
        }
    ]);
    console.log(answer);
    let target = answer.target;
    if (argv.list) {
        
    }
};

export default attr;