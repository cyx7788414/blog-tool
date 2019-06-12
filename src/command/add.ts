import * as yargs from 'yargs';
import * as inquirer from 'inquirer';
import * as path from 'path';
import common from "../common/common";
import Index from '../class/index';
import Type from 'src/class/type';
import Tag from 'src/class/tag';
import Article from 'src/class/article';

interface Answer {
    type: number;
    newType?: string;
    tag: number[];
    newTag?: string
};

interface CleanAnswer {
    type: Type;
    newType: Type;
    tag: Tag[];
    newTag: Tag[];
}

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

const checkAnswer = (indexObj: Index, answer: Answer): CleanAnswer => {
    let type: Type;
    let newType: Type;
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
            newType = type;
        }
    }
    let tag: Tag[] = [];
    let newTag: Tag[] = [];
    if (answer.tag.length > 0) {
        let temp: Tag[] = [];
        if (answer.tag.includes(-2)) {
            let newTags: string[] = Array.from(new Set(answer.newTag.split(';'))).filter(v => !/\s+/.test(v)).map(v => v.trim());
            let lastElem = indexObj.tags[indexObj.tags.length - 1];
            let last: number = lastElem?lastElem.id:-1;
            newTags.forEach(v => {
                let tag = indexObj.tags.find(e => e.name === v);
                let obj: Tag;
                if (!tag) {
                    obj = {name: v, id: ++last};
                    newTag.push(obj);
                }
                temp.push(tag || obj);
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
        newType: newType,
        tag: tag,
        newTag: newTag
    };
};

const makeSure = async (argv: yargs.Arguments<any>, answer: CleanAnswer): Promise<{makesure: boolean}> => {
    let message: string = `please confirm new article info:
        name: ${argv.name}
        type: ${answer.type?answer.type.name: null}
        tag: ${answer.tag.length > 0?answer.tag.map(v => v.name).join('; '): null}
    `;
    return common.inquirer.make([
        {
            type: 'confirm',
            name: 'makesure',
            message: message
        }
    ]);
};

const handleConfig = (argv: yargs.Arguments<any>, indexObj: Index, answer: CleanAnswer): void => {
    if (answer.newType) {
        indexObj.types.push(answer.newType);
    }
    if (answer.newTag.length > 0) {
        indexObj.tags = indexObj.tags.concat(answer.newTag);
    }
    let date: Date = new Date();
    if (argv.date) {
        date = new Date(argv.date);
    }
    let id = (indexObj.articles.length - 1 > -1?indexObj.articles[indexObj.articles.length - 1].id:-1) + 1;
    let relativePath = `./articles/${date.getFullYear()}/${date.getMonth() + 1}/${id}`;
    let absolutePath = path.join(argv.path, relativePath);
    
    common.fs.mkdir({
        path: absolutePath,
        option: {
            recursive: true
        },
        success: () => {
            common.fs.write({
                path: path.join(absolutePath, 'article.md'),
                str: '',
                success: () => {
                    let article: Article = {
                        id: id,
                        name: argv.name,
                        type: answer.type?answer.type.id:null,
                        tag: answer.tag.map(v => v.id),
                        path: relativePath,
                        auther: argv.auther?argv.auther:'',
                        create: date.getTime(),
                        update: new Date().getTime()
                    };
                    indexObj.articles.push(article);
                    common.fs.write({
                        path: path.join(argv.path, 'index.json'),
                        str: JSON.stringify(indexObj),
                        success: () => {
                            common.info.success(`done!\nthe article ${argv.name} has be added under path ${absolutePath}\nyou can edit article.md and add images under the path above`);
                        }
                    });
                }
            });
        }
    });
};

const add = (argv: yargs.Arguments<any>): void => {
    if (argv.date && (Number.isNaN(new Date(argv.date).getTime()) || (new Date(argv.date).getTime() > new Date().getTime()))) {
        common.info.warn('Invalid Date');
        return;
    }
    if (common.tool.initializedCheck(argv.path)) {
        common.fs.read({
            path: path.join(argv.path, 'index.json'),
            sync: true,
            success: async (data: Buffer): Promise<void> => {
                let indexObj = JSON.parse(data.toString());
                let formAnswer = await initForm(indexObj);
                let cleanAnswer: CleanAnswer = checkAnswer(indexObj, formAnswer);
                let confirmAnswer = await makeSure(argv, cleanAnswer);
                if (confirmAnswer.makesure) {
                    handleConfig(argv, indexObj, cleanAnswer);
                }
            }
        });
    } else {
        common.info.warn(`path ${argv.path} has not be initialized, use command init to initialise it first`);
    }
};

export default add;