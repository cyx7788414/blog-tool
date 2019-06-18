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
    common.edit.editArticleItemPrepare(argv, async (params: any): Promise<void> => {
        let formAnswer = await common.edit.initForm(params.indexObj, params.target);
        let cleanAnswer: CleanAnswer = common.edit.checkAnswer(params.indexObj, formAnswer);
        let confirmAnswer = await common.edit.makeSure(argv, cleanAnswer, params.target);
        if (confirmAnswer.makesure) {
            handleConfig(argv, params.indexObj, cleanAnswer, params.target, params.indexPath);
        }
    });
};

export default update;