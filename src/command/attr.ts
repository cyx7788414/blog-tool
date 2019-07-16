import * as yargs from 'yargs';
import common from '../common/common';
import * as path from 'path';
import Index from '../class/index';

const enquire = async (argv: yargs.Arguments<any>, indexObj: Index): Promise<void> => {
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
    let target: string = answer.target;
    let result: any[] = [];
    for (let [key, value] of Object.entries(indexObj)) {
        if (target === key) {
            result = value;
        }
    }
    if (argv.list) {
        common.info.log(`selected result:`);
        common.info.log(result.map((v:any) => v.name).join('\n'));
        return;
    }
    if (argv.rename) {
        let renameTarget = await common.inquirer.make([
            {
                type: 'list',
                name: 'target',
                message: 'please choice rename target',
                choices: result.map(v => {
                    return {name: v.name, value: v}
                })
            }
        ]);
    }
};

const attr = (argv: yargs.Arguments<any>): void => {
    let absolutePath: string = path.resolve(argv.path);
    common.fs.read({
        path: path.join(absolutePath, 'index.json'),
        success: (data: Buffer): void  => {
            let indexObj: Index = JSON.parse(data.toString());
            enquire(argv, indexObj);
        },
        error: () => {
            common.info.error('Invalid path');
        }
    });
};

export default attr;