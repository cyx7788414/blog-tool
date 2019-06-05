import chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';

let init = (argv: any): void => {
    console.warn('init');
    console.log(path.resolve(argv.path));
    let target = path.resolve(argv.path);
    fs.exists(target, exists => {
        if (exists) {
            console.log(path.join(target, 'index.json'));
        } else {
            console.log('no path')
        }
    });
};

export default init;