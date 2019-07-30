"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common/common");
const del = (argv) => {
    common_1.default.edit.editArticleItemPrepare(argv, (param) => __awaiter(this, void 0, void 0, function* () {
        let id = param.target.id;
        let index = param.indexObj.articles.findIndex((v) => v.id === id);
        let answer = yield common_1.default.inquirer.make([
            {
                type: 'confirm',
                name: 'makesure',
                message: `the article ${param.target.name} will be ${argv.force ? 'force deleted' : 'set as delete'}, are you sure?`
            }
        ]);
        if (!answer.makesure) {
            return;
        }
        if (argv.force) {
            common_1.default.fs.rmDirRecur({
                path: param.absolutePath,
                sync: true,
                success: () => {
                    param.indexObj.articles.splice(index, 1);
                }
            });
        }
        else {
            param.indexObj.articles[index].status = 2;
        }
        common_1.default.fs.write({
            path: param.indexPath,
            str: JSON.stringify(param.indexObj),
            success: () => {
                common_1.default.info.success(`done!\nthe article ${param.target.name} has be ${argv.force ? 'force deleted' : 'set as delete'}`);
            }
        });
    }));
};
exports.default = del;
