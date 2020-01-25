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
const path = require("path");
const common_1 = require("../common/common");
const handleConfig = (argv, indexObj, answer) => {
    if (answer.newType) {
        indexObj.types.push(answer.newType);
    }
    if (answer.newTag.length > 0) {
        indexObj.tags = indexObj.tags.concat(answer.newTag);
    }
    let date = new Date();
    if (argv.date) {
        date = new Date(argv.date);
    }
    let id = (indexObj.articles.length - 1 > -1 ? indexObj.articles[indexObj.articles.length - 1].id : -1) + 1;
    let relativePath = `./articles/${date.getFullYear()}/${date.getMonth() + 1}/${id}`;
    let absolutePath = path.join(argv.path, relativePath);
    common_1.default.fs.mkdir({
        path: absolutePath,
        option: {
            recursive: true
        },
        success: () => {
            common_1.default.fs.write({
                path: path.join(absolutePath, 'article.md'),
                str: '',
                success: () => {
                    let article = {
                        id: id,
                        name: argv.name,
                        type: answer.type ? answer.type.id : null,
                        tag: answer.tag.map(v => v.id),
                        path: relativePath,
                        auther: argv.auther ? argv.auther : '',
                        create: date.getTime(),
                        update: new Date().getTime(),
                        status: answer.status
                    };
                    indexObj.articles.push(article);
                    common_1.default.fs.write({
                        path: path.join(argv.path, 'index.json'),
                        str: JSON.stringify(indexObj),
                        success: () => {
                            common_1.default.info.success(`done!\nthe article ${argv.name} has be added under path ${absolutePath}\nyou can edit article.md and add images under the path above`);
                        }
                    });
                }
            });
        }
    });
};
const add = (argv) => {
    if (argv.date && (Number.isNaN(new Date(argv.date).getTime()) || (new Date(argv.date).getTime() > new Date().getTime()))) {
        common_1.default.info.warn('Invalid Date');
        return;
    }
    if (common_1.default.tool.initializedCheck(argv.path)) {
        common_1.default.fs.read({
            path: path.join(argv.path, 'index.json'),
            success: (data) => __awaiter(void 0, void 0, void 0, function* () {
                let indexObj = JSON.parse(data.toString());
                let formAnswer = yield common_1.default.edit.initForm(indexObj);
                let cleanAnswer = common_1.default.edit.checkAnswer(indexObj, formAnswer);
                let confirmAnswer = yield common_1.default.edit.makeSure(argv, cleanAnswer);
                if (confirmAnswer.makesure) {
                    handleConfig(argv, indexObj, cleanAnswer);
                }
            })
        });
    }
    else {
        common_1.default.info.warn(`path ${argv.path} has not be initialized, use command init to initialise it first`);
    }
};
exports.default = add;
