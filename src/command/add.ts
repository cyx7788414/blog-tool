import yargs = require("yargs");
import common from "src/common/common";

const add = (argv: yargs.Arguments<any>): void => {
    if (common.tool.initializedCheck(argv.path)) {

    } else {
        common.info.warn(`path ${argv.path} has not be initialized, use command init to initialise it first`);
    }
};

export default add;