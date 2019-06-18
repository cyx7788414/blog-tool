import * as yargs from 'yargs';
import * as path from 'path';
import common from '../common/common';

const del = (argv: yargs.Arguments<any>): void => {
    common.edit.editArticleItemPrepare(argv, (param: any): void => {
        console.log(param);
        let id = param.target.id;
        let index = param.indexObj.articles.findIndex(v => v.id === id);
        if (argv.force) {

        } else {
            param.indexObj.articles[index].delete === true;
        }
        common.fs.write({
            path: param
        })
    });
};

export default del;