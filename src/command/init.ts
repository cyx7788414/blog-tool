import chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';
import common from '../common/common';

let mkStructure = (target: string): void => {
    let article = path.join(target, 'articles');
    common.fs.mkdir({
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
    common.fs.write({path: index, str: indexStr});
    
    let version = path.join(target, 'version.json');
    let versionStr = JSON.stringify({
        version: new Date().getTime()
    });
    common.fs.write({path: version, str: versionStr});
};

let init = (argv: any): void => {
    common.info.log('check path');
    let target = path.resolve(argv.path);
    fs.exists(target, exists => {
        if (exists) {
            let files = fs.readdirSync(target);
            if (files.includes('index.json') || files.includes('articles') || files.includes('version.json')) {
                common.info.warn('this path seem to be initialized before, please check or remove the files that blog-tool created');
            } else {
                mkStructure(target);
            }
        } else {
            common.info.log(`target path dose not exist`);
            common.fs.mkdir({
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

export default init;