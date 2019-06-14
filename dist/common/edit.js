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
const common_1 = require("./common");
const initForm = (indexObj, target) => __awaiter(this, void 0, void 0, function* () {
    let typeList = indexObj.types;
    let tagList = indexObj.tags;
    let answer = yield common_1.default.inquirer.make([
        {
            type: 'list',
            name: 'type',
            message: 'choice a type',
            choices: typeList.map(v => {
                return {
                    name: v.name,
                    value: v.id,
                    checked: target && target.type === v.id ? true : false
                };
            }).concat([
                { name: 'i will update it later', value: -1, checked: false },
                { name: 'add new one', value: -2, checked: false }
            ])
        },
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
                id: last ? last.id : -1 + 1,
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
        newTag: newTag
    };
};
const makeSure = (argv, answer, target) => __awaiter(this, void 0, void 0, function* () {
    let message = `please confirm article info:
        name: ${argv.name || (target ? target.name : '')}
        auther: ${argv.auther || (target ? target.auther : '')}
        type: ${answer.type ? answer.type.name : null}
        tag: ${answer.tag.length > 0 ? answer.tag.map(v => v.name).join('; ') : null}
    `;
    return common_1.default.inquirer.make([
        {
            type: 'confirm',
            name: 'makesure',
            message: message
        }
    ]);
});
const editOperation = {
    initForm: initForm,
    checkAnswer: checkAnswer,
    makeSure: makeSure
};
exports.default = editOperation;
