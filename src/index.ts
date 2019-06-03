import  * as yargs  from 'yargs';

const argv = yargs
    .usage('help to write blog with markdown & generate data like index/classification')
    .option('init', {
        alias: 'i',
        description: 'init base file'
    })
    .help('help').alias('help', 'h')
    .version('version', '1.0.0').alias('version', 'v')
    .argv;

console.log(argv);