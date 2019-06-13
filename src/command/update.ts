import yargs = require("yargs");
import * as path from 'path';
import common from "../common/common";

const update = (argv: yargs.Arguments<any>): void => {
    let absolutePath: string = path.resolve(argv.path);
    let pathParam: path.ParsedPath = path.parse(absolutePath);
    if (common.tool.updatableCheck(absolutePath) && /\d+/.test(pathParam.base)) {
        console.log(absolutePath)
        let id = parseInt(pathParam.base);
    }
};

export default update;