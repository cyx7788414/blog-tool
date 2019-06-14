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
const path = require("path");
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
        indexObj.articles[index] = target;
        common_1.default.fs.write({
            path: indexPath,
            str: JSON.stringify(indexObj),
            success: () => {
                common_1.default.info.success(`done!\nthe article ${argv.name} has be update to index.json`);
            }
        });
    }
    else {
        console.warn('article dose not exist');
    }
};
const update = (argv) => {
    let absolutePath = path.resolve(argv.path);
    let pathParam = path.parse(absolutePath);
    let indexPath = path.join(absolutePath, '../../../../index.json');
    if (common_1.default.tool.updatableCheck(absolutePath) && /\d+/.test(pathParam.base)) {
        let id = parseInt(pathParam.base);
        common_1.default.fs.read({
            path: indexPath,
            success: (data) => __awaiter(this, void 0, void 0, function* () {
                let indexObj = JSON.parse(data.toString());
                let target = indexObj.articles.find((v, i) => {
                    return v.id === id;
                });
                let formAnswer = yield common_1.default.edit.initForm(indexObj, target);
                let cleanAnswer = common_1.default.edit.checkAnswer(indexObj, formAnswer);
                let confirmAnswer = yield common_1.default.edit.makeSure(argv, cleanAnswer, target);
                if (confirmAnswer.makesure) {
                    handleConfig(argv, indexObj, cleanAnswer, target, indexPath);
                }
            })
        });
    }
    else {
        common_1.default.info.warn(`path ${absolutePath} is not a article item path`);
    }
};
exports.default = update;
