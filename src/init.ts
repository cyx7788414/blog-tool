import chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';

let mkStructure = (): void => {

}

let init = (argv: any): void => {
    console.info('check path');
    let target = path.resolve(argv.path);
    fs.exists(target, exists => {
        if (exists) {
            // console.log(path.join(target, 'index.json'));
        } else {
            console.info('path dose not exist, mkdir');
            fs.mkdir(target, {recursive: true}, err => {
                if (err) {
                    console.error(chalk.red('mkdir error'));
                    console.log(err);
                } else {
                    mkStructure();
                }
            });
        }
    });
};

export default init;