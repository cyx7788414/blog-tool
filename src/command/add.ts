import * as yargs from 'yargs';
import * as path from 'path';
import common from "../common/common";
import Index from '../class/index';
import Article from 'src/class/article';
import CleanAnswer from '../class/cleananswer';

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
                        update: new Date().getTime(),
                        delete: false
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
            success: async (data: Buffer): Promise<void> => {
                let indexObj = JSON.parse(data.toString());
                let formAnswer = await common.edit.initForm(indexObj);
                let cleanAnswer: CleanAnswer = common.edit.checkAnswer(indexObj, formAnswer);
                let confirmAnswer = await common.edit.makeSure(argv, cleanAnswer);
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