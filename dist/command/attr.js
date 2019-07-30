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
const path = require("path");
const enquire = (argv, indexObj, indexPath) => __awaiter(this, void 0, void 0, function* () {
    let answer = yield common_1.default.inquirer.make([
        {
            type: 'list',
            name: 'target',
            message: 'please choice the target',
            choices: Object.entries(common_1.default.tool.attrMap.name).map(v => {
                return {
                    name: v[0],
                    value: v[1]
                };
            })
        }
    ]);
    let target = answer.target;
    let result = indexObj[target];
    if (argv.list) {
        common_1.default.info.log(`selected result:`);
        common_1.default.info.log(result.map((v) => v.name).join('\n'));
        return;
    }
    if (argv.rename) {
        let renameAnswer = yield common_1.default.inquirer.make([
            {
                type: 'list',
                name: 'target',
                message: 'please choice rename target',
                choices: result.map(v => {
                    return { name: v.name, value: v };
                })
            },
            {
                type: 'input',
                name: 'name',
                message: 'please input the new name',
                validate: val => {
                    if (val) {
                        return true;
                    }
                    return 'no space & not empty';
                }
            },
            {
                type: 'confirm',
                name: 'makesure',
                message: answer => {
                    return `you will change ${answer.target.name} to ${answer.name}, are u sure?`;
                }
            }
        ]);
        if (renameAnswer.makesure) {
            indexObj[target] = result.map(v => {
                if (v.id === renameAnswer.target.id) {
                    v.name = renameAnswer.name;
                }
                return v;
            });
        }
        else {
            return;
        }
    }
    if (argv.delete) {
        let deleteAnswer = yield common_1.default.inquirer.make([
            {
                type: 'checkbox',
                name: 'target',
                message: 'please choice delete targets',
                choices: result.map(v => {
                    return { name: v.name, value: v };
                })
            },
            {
                type: 'confirm',
                name: 'makesure',
                message: answer => {
                    return `you will delete targets below, are u sure?\n${answer.target.map((v) => v.name).join('\n')}`;
                }
            }
        ]);
        if (deleteAnswer.makesure) {
            let idList = deleteAnswer.target.map((v) => v.id);
            indexObj[target] = result.filter(v => !idList.includes(v.id));
            let index = common_1.default.tool.attrMap.get(target);
            indexObj.articles.map((v) => {
                if (v[index] && v[index].length >= 0) {
                    v[index] = v[index].filter((r) => !idList.includes(r));
                }
                else {
                    if (idList.includes(v[index])) {
                        v[index] = null;
                    }
                }
            });
        }
        else {
            return;
        }
    }
    common_1.default.tool.writeIndex(indexPath, indexObj, () => {
        common_1.default.info.success('done');
    });
});
const attr = (argv) => {
    let absolutePath = path.resolve(argv.path);
    let indexPath = path.join(absolutePath, 'index.json');
    common_1.default.fs.read({
        path: indexPath,
        success: (data) => {
            let indexObj = JSON.parse(data.toString());
            enquire(argv, indexObj, indexPath);
        },
        error: () => {
            common_1.default.info.error('Invalid path');
        }
    });
};
exports.default = attr;
