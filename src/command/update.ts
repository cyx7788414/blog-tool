import yargs = require("yargs");
import * as path from 'path';
import common from "../common/common";
import Index from "../class/index";
import Article from "../class/article";
import CleanAnswer from '../class/cleananswer';

const handleConfig = (argv: yargs.Arguments<any>, indexObj: Index, answer: CleanAnswer, target: Article, indexPath: string): void => {
    if (answer.newType) {
        indexObj.types.push(answer.newType);
    }
    if (answer.newTag.length > 0) {
        indexObj.tags = indexObj.tags.concat(answer.newTag);
    }
    let id = target.id;
    let index = indexObj.articles.findIndex(v => v.id === id);
    if (index > -1) {
        if (argv.name) {
            target.name = argv.name;
        }
        if (argv.auther) {
            target.auther = argv.auther;
        }
        target.type = answer.type?answer.type.id:null;
        target.tag = answer.tag.map(v => v.id);
        target.update = new Date().getTime();
        indexObj.articles[index] = target;
        common.fs.write({
            path: indexPath,
            str: JSON.stringify(indexObj),
            success: () => {
                common.info.success(`done!\nthe article ${argv.name} has be update to index.json`);
            }
        })
    } else {
        console.warn('article dose not exist');
    }
};

const update = (argv: yargs.Arguments<any>): void => {
    let absolutePath: string = path.resolve(argv.path);
    let pathParam: path.ParsedPath = path.parse(absolutePath);
    let indexPath: string = path.join(absolutePath, '../../../../index.json');
    if (common.tool.updatableCheck(absolutePath) && /\d+/.test(pathParam.base)) {
        let id = parseInt(pathParam.base);
        common.fs.read({
            path: indexPath,
            success: async (data: Buffer): Promise<void>  => {
                let indexObj: Index = JSON.parse(data.toString());
                let target: Article = indexObj.articles.find((v, i) => {
                    return v.id === id;
                });
                let formAnswer = await common.edit.initForm(indexObj, target);
                let cleanAnswer: CleanAnswer = common.edit.checkAnswer(indexObj, formAnswer);
                let confirmAnswer = await common.edit.makeSure(argv, cleanAnswer, target);
                if (confirmAnswer.makesure) {
                    handleConfig(argv, indexObj, cleanAnswer, target, indexPath);
                }
            }
        });
    } else {
        common.info.warn(`path ${absolutePath} is not a article item path`);
    }
};

export default update;