import * as yargs from 'yargs';
import * as path from 'path';
import common from '../common/common';
import Article from '../class/article';
import Index from '../class/index';

const del = (argv: yargs.Arguments<any>): void => {
    common.edit.editArticleItemPrepare(argv, async (param: {
        indexObj: Index,
        target: Article,
        indexPath: string,
        absolutePath: string,
        pathParam: path.ParsedPath
    }): Promise<void> => {
        let id = param.target.id;
        let index = param.indexObj.articles.findIndex((v: Article) => v.id === id);
        let answer = await common.inquirer.make([
            {
                type: 'confirm',
                name: 'makesure',
                message: `the article ${param.target.name} will be ${argv.force?'force deleted':'set as delete'}, are you sure?`
            }
        ]);
        if (!answer.makesure) {
            return;
        }
        if (argv.force) {
            common.fs.rmDirRecur({
                path: param.absolutePath,
                sync: true,
                success: () => {
                    param.indexObj.articles.splice(index, 1);
                }
            });
        } else {
            param.indexObj.articles[index].status = 2;
        }
        common.fs.write({
            path: param.indexPath,
            str: JSON.stringify(param.indexObj),
            success: () => {
                common.info.success(`done!\nthe article ${param.target.name} has be ${argv.force?'force deleted':'set as delete'}`);
            }
        });
    });
};

export default del;