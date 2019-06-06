import chalk from 'chalk';

const infoOperation = {
    log: (str: string): void => {
        console.log(str);
    },
    warn: (str: string): void => {
        console.warn(chalk.yellow(str));
    },
    error: (str: string): void => {
        console.error(chalk.red(str));
    },
    success: (str: string): void => {
        console.info(chalk.green(str));
    }
};

export default infoOperation;