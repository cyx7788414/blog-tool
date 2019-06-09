import * as yargs from 'yargs';
import * as inquirer from 'inquirer';
import * as path from 'path';
import common from "../common/common";
import Index from '../class/index';
import Type from 'src/class/type';
import Tag from 'src/class/tag';

interface Answer {
    type: number;
    newType?: string;
    tag: number[];
    newTag?: string
};

const initForm = async (indexObj: Index): Promise<Answer> => {
    let typeList: Type[] = indexObj.types;
    let tagList: Tag[] = indexObj.tags;
    let answer: Promise<Answer> = await common.inquirer.make([
        {
            type: 'list',
            name: 'type',
            message: 'choice a type',
            choices: typeList.map(v => {
                return {
                    name: v.name,
                    value: v.id
                };
            }).concat([
                {name: 'i will update it later', value: -1},
                {name: 'add new one', value: -2}
            ])
        },
        {
            type: 'input',
            name: 'newType',
            message: 'input a new type',
            when: current => (current.type === -2 && !current.newType)
        },
        {
            type: 'checkbox',
            name: 'tag',
            message: 'choice some tag',
            choices: tagList.map(v => {
                return {
                    name: v.name,
                    value: v.id
                };
            }).concat([
                {name: 'add some new', value: -2}
            ])
        },
        {
            type: 'input',
            name: 'newTag',
            message: 'input some new tag (split it with \';\'))',
            when: current => (current.tag.includes(-2) && !current.newTag)
        }
    ]); 
    return answer;
};

const checkAnswer = (indexObj: Index, answer: Answer): {type: Type, tag: Tag[]} => {
    let obj = {};
    let type: Type;
    if (answer.type > -1) {
        type = indexObj.types.find(v => v.id === answer.type);
    } else if (answer.type === -2) {
        type = indexObj.types.find(v => v.name === answer.newType);
        if (!type) {
            let last = indexObj.types[indexObj.types.length - 1];
            type = {
                id: last?last.id:-1 + 1,
                name: answer.newType
            };
        }
    }
    let tag: Tag[] = [];
    if (answer.tag.length > 0) {
        let temp: Tag[] = [];
        if (answer.tag.includes(-2)) {
            let newTags: string[] = Array.from(new Set(answer.newTag.split(';'))).filter(v => !/\s+/.test(v)).map(v => v.trim());
            let lastElem = indexObj.tags[indexObj.tags.length - 1];
            let last: number = lastElem?lastElem.id:-1;
            newTags.forEach(v => {
                let tag = indexObj.tags.find(e => e.name === v);
                temp.push(tag || {name: v, id: ++last});
            });
        }
        answer.tag.filter(v => v > -1).forEach(v => {
            if (!temp.find(e => e.id === v)) {
                temp.push(indexObj.tags.find(a => a.id === v));
            }
        });
        tag = temp;
    }
    return {
        type: type,
        tag: tag
    };
};

const add = (argv: yargs.Arguments<any>): void => {
    if (common.tool.initializedCheck(argv.path)) {
        common.fs.read({
            path: path.join(argv.path, 'index.json'),
            sync: true,
            success: async (data: Buffer): Promise<void> => {
                let indexObj = JSON.parse(data.toString());
                let answer = await initForm(indexObj);
                let cleanAnswer = checkAnswer(indexObj, answer);
            }
        })
    } else {
        common.info.warn(`path ${argv.path} has not be initialized, use command init to initialise it first`);
    }
};

export default add;