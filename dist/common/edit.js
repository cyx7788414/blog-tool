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
const common_1 = require("./common");
const initForm = (indexObj, target) => __awaiter(this, void 0, void 0, function* () {
    let typeList = indexObj.types;
    let tagList = indexObj.tags;
    let typeChoices = typeList.map(v => {
        let obj = {
            name: v.name,
            value: v.id,
            checked: (target && target.type === v.id) ? true : false
        };
        return obj;
    }).concat([
        { name: 'i will update it later', value: -1, checked: (target && target.type === null) ? true : false },
        { name: 'add new one', value: -2, checked: false }
    ]);
    let answer = yield common_1.default.inquirer.make([
        Object.assign({
            type: 'list',
            name: 'type',
            message: 'choice a type',
            choices: typeChoices
        }, target ? { default: typeChoices.findIndex(v => v.value === target.type) || typeChoices.length - 1 } : {}),
        {
            type: 'input',
            name: 'newType',
            message: 'input a new type',
            when: current => (current.type === -2 && !current.newType)
        },
        {
            type: 'checkbox',
            name: 'tag',
            message: 'choice some tag',
            choices: tagList.map(v => {
                return {
                    name: v.name,
                    value: v.id,
                    checked: target && target.tag.includes(v.id) ? true : false
                };
            }).concat([
                { name: 'add some new', value: -2, checked: false }
            ])
        },
        {
            type: 'input',
            name: 'newTag',
            message: 'input some new tag (split it with \';\'))',
            when: current => (current.tag.includes(-2) && !current.newTag)
        },
        {
            type: 'list',
            name: 'status',
            message: 'choice the status of this article',
            when: current => target ? true : false,
            choices: common_1.default.data.statusList.map(v => {
                return {
                    name: v.name,
                    value: v.id,
                    checked: target && target.status === v.id
                };
            }),
            default: () => {
                return target ? target.status : 0;
            }
        }
    ]);
    return answer;
});
const checkAnswer = (indexObj, answer) => {
    let type;
    let newType;
    if (answer.type > -1) {
        type = indexObj.types.find(v => v.id === answer.type);
    }
    else if (answer.type === -2) {
        type = indexObj.types.find(v => v.name === answer.newType);
        if (!type) {
            let last = indexObj.types[indexObj.types.length - 1];
            type = {
                id: (last ? last.id : -1) + 1,
                name: answer.newType
            };
            newType = type;
        }
    }
    let tag = [];
    let newTag = [];
    if (answer.tag.length > 0) {
        let temp = [];
        if (answer.tag.includes(-2)) {
            let newTags = Array.from(new Set(answer.newTag.split(';'))).filter(v => !/\s+/.test(v)).map(v => v.trim());
            let lastElem = indexObj.tags[indexObj.tags.length - 1];
            let last = lastElem ? lastElem.id : -1;
            newTags.forEach(v => {
                let tag = indexObj.tags.find(e => e.name === v);
                let obj;
                if (!tag) {
                    obj = { name: v, id: ++last };
                    newTag.push(obj);
                }
                temp.push(tag || obj);
            });
        }
        answer.tag.filter(v => v > -1).forEach(v => {
            if (!temp.find(e => e.id === v)) {
                temp.push(indexObj.tags.find(a => a.id === v));
            }
        });
        tag = temp;
    }
    return {
        type: type,
        newType: newType,
        tag: tag,
        newTag: newTag,
        status: answer.status || 0
    };
};
const makeSure = (argv, answer, target) => __awaiter(this, void 0, void 0, function* () {
    let message = `please confirm article info:
        name: ${argv.name || (target ? target.name : '')}
        auther: ${argv.auther || (target ? target.auther : '')}
        type: ${answer.type ? answer.type.name : null}
        tag: ${answer.tag.length > 0 ? answer.tag.map(v => v.name).join('; ') : null},
        status: ${common_1.default.data.statusList.find(v => v.id === (answer.status || 0)).name}
    `;
    return common_1.default.inquirer.make([
        {
            type: 'confirm',
            name: 'makesure',
            message: message
        }
    ]);
});
const editArticleItemPrepare = (argv, callback) => {
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
                if (!target) {
                    common_1.default.info.warn(`id ${id} dose not exist in index.json`);
                    return;
                }
                try {
                    callback({
                        indexObj: indexObj,
                        target: target,
                        indexPath: indexPath,
                        absolutePath: absolutePath,
                        pathParam: pathParam
                    });
                }
                catch (e) {
                    console.log(e);
                }
            })
        });
    }
    else {
        common_1.default.info.warn(`path ${absolutePath} is not a article item path`);
    }
};
const editOperation = {
    initForm: initForm,
    checkAnswer: checkAnswer,
    makeSure: makeSure,
    editArticleItemPrepare: editArticleItemPrepare
};
exports.default = editOperation;
