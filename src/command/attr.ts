import * as yargs from 'yargs';
import common from '../common/common';
import * as path from 'path';
import Index from '../class/index';

const enquire = async (argv: yargs.Arguments<any>, indexObj: Index, indexPath: string): Promise<void> => {
    let answer = await common.inquirer.make([
        {
            type: 'list',
            name: 'target',
            message: 'please choice the target',
            choices: Object.entries(common.tool.attrMap.name).map(v => {
                return {
                    name: v[0],
                    value: v[1]
                };
            })
        }
    ]);
    let target: string = answer.target;
    let result: any[] = (indexObj as any)[target];
    if (argv.list) {
        common.info.log(`selected result:`);
        common.info.log(result.map((v:any) => v.name).join('\n'));
        return;
    }
    if (argv.rename) {
        let renameAnswer = await common.inquirer.make([
            {
                type: 'list',
                name: 'target',
                message: 'please choice rename target',
                choices: result.map(v => {
                    return {name: v.name, value: v}
                })
            },
            {
                type: 'input',
                name: 'name',
                message: 'please input the new name',
                validate: (val: any) => {
                    if (val) {
                        return true;
                    }
                    return 'no space & not empty';
                }
            },
            {
                type: 'confirm',
                name: 'makesure',
                message: (answer: any) => {
                    return `you will change ${answer.target.name} to ${answer.name}, are u sure?`;
                }
            }
        ]);
        if (renameAnswer.makesure) {
            (indexObj as any)[target] = result.map(v => {
                if (v.id === renameAnswer.target.id) {
                    v.name = renameAnswer.name;
                }
                return v;
            });
        } else {
            return;
        }
    }
    if (argv.delete) {
        let deleteAnswer = await common.inquirer.make([
            {
                type: 'checkbox',
                name: 'target',
                message: 'please choice delete targets',
                choices: result.map(v => {
                    return {name: v.name, value: v}
                })
            },
            {
                type: 'confirm',
                name: 'makesure',
                message: (answer: any) => {
                    return `you will delete targets below, are u sure?\n${answer.target.map((v: any) => v.name).join('\n')}`;
                }
            }
        ]);
        if (deleteAnswer.makesure) {
            let idList = deleteAnswer.target.map((v: any) => v.id);
            (indexObj as any)[target] = result.filter(v => !idList.includes(v.id));
            let index = common.tool.attrMap.get(target);
            indexObj.articles.map((v: any) => {
                if (v[index] && v[index].length >= 0) {
                    v[index] = v[index].filter((r: number) => !idList.includes(r));
                } else {
                    if (idList.includes(v[index])) {
                        v[index] = null;
                    }
                }
            });
        } else {
            return;
        }
    }
    common.tool.writeIndex(indexPath, indexObj, () => {
        common.info.success('done');
    });
};

const attr = (argv: yargs.Arguments<any>): void => {
    let absolutePath: string = path.resolve(argv.path);
    let indexPath: string = path.join(absolutePath, 'index.json');
    common.fs.read({
        path: indexPath,
        success: (data: Buffer): void  => {
            let indexObj: Index = JSON.parse(data.toString());
            enquire(argv, indexObj, indexPath);
        },
        error: () => {
            common.info.error('Invalid path');
        }
    });
};

export default attr;