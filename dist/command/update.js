"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common/common");
const handleConfig = (argv, indexObj, answer, target, indexPath) => {
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
        target.type = answer.type ? answer.type.id : null;
        target.tag = answer.tag.map(v => v.id);
        target.update = new Date().getTime();
        target.status = answer.status;
        indexObj.articles[index] = target;
        common_1.default.fs.write({
            path: indexPath,
            str: JSON.stringify(indexObj),
            success: () => {
                common_1.default.info.success(`done!\nthe article ${target.name} has be update to index.json`);
            }
        });
    }
    else {
        console.warn('article dose not exist');
    }
};
const update = (argv) => {
    common_1.default.edit.editArticleItemPrepare(argv, (params) => __awaiter(void 0, void 0, void 0, function* () {
        let formAnswer = yield common_1.default.edit.initForm(params.indexObj, params.target);
        let cleanAnswer = common_1.default.edit.checkAnswer(params.indexObj, formAnswer);
        let confirmAnswer = yield common_1.default.edit.makeSure(argv, cleanAnswer, params.target);
        if (confirmAnswer.makesure) {
            handleConfig(argv, params.indexObj, cleanAnswer, params.target, params.indexPath);
        }
    }));
};
exports.default = update;
