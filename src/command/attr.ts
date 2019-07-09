import * as yargs from 'yargs';
import common from '../common/common';

const attr = async (argv: yargs.Arguments<any>): Promise<void> => {
    console.log(argv);
    let answer: Promise<string> = await common.inquirer.make([

    ]);
};

export default attr;