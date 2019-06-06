"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const common_1 = require("../common/common");
let mkStructure = (target) => {
    let article = path.join(target, 'articles');
    common_1.default.fs.mkdir({
        path: article,
        option: {
            recursive: true
        }
    });
    let index = path.join(target, 'index.json');
    let indexStr = JSON.stringify({
        types: [],
        tags: [],
        articles: []
    });
    common_1.default.fs.write({ path: index, str: indexStr });
    let version = path.join(target, 'version.json');
    let versionStr = JSON.stringify({
        version: new Date().getTime()
    });
    common_1.default.fs.write({ path: version, str: versionStr });
};
let init = (argv) => {
    common_1.default.info.log('check path');
    let target = path.resolve(argv.path);
    fs.exists(target, exists => {
        if (exists) {
            let files = fs.readdirSync(target);
            if (files.includes('index.json') || files.includes('articles') || files.includes('version.json')) {
                common_1.default.info.warn('this path seem to be initialized before, please check or remove the files that blog-tool created');
            }
            else {
                mkStructure(target);
            }
        }
        else {
            common_1.default.info.log(`target path dose not exist`);
            common_1.default.fs.mkdir({
                path: target,
                option: {
                    recursive: true
                },
                success: () => {
                    mkStructure(target);
                }
            });
        }
    });
};
exports.default = init;
