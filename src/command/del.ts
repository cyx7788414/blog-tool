import * as yargs from 'yargs';
import * as path from 'path';
import common from '../common/common';
import Article from '../class/article';
import Index from '../class/index';

const del = (argv: yargs.Arguments<any>): void => {
    common.edit.editArticleItemPrepare(argv, (param: {
        indexObj: Index,
        target: Article,
        indexPath: string,
        absolutePath: string,
        pathParam: path.ParsedPath
    }): void => {
        let id = param.target.id;
        let index = param.indexObj.articles.findIndex((v: Article) => v.id === id);
        if (argv.force) {
            common.fs.rmDirRecur({
                path: param.absolutePath,
                sync: true,
                success: () => {
                    param.indexObj.articles.splice(index, 1);
                }
            });
        } else {
            param.indexObj.articles[index].delete = true;
        }
        common.fs.write({
            path: param.indexPath,
            str: JSON.stringify(param.indexObj),
            success: () => {
                common.info.success(`done!\nthe article ${param.indexObj.articles[index].name} has be ${argv.force?'force deleted':'set as delete'}`);
            }
        });
    });
};

export default del;