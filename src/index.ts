import  * as yargs  from 'yargs';

const argv = yargs
    .usage('help to write blog with markdown & generate data like index/classification')
    .help('help').alias('help', 'h')
    .version('version', '1.0.0').alias('version', 'v')
    .command('init', 'init base path', {
        path: {
            alias: 'p',
            description: 'bath path',
            default: './',
            type: 'string'
        }
    })
    .command('add', 'add new article', {
        name: {
            alias: 'n',
            description: 'name for the new article',
            type: 'string',
            demandOption: true
        }
    })
    .command('delete', '')
    .argv;

console.log(argv);