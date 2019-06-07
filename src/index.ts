import * as yargs  from 'yargs';

import init from './command/init';
import add from './command/add';

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
    }, init)
    .command('add', 'add new article', {
        path: {
            alias: 'p',
            description: 'initialized bath path',
            default: './',
            type: 'string'
        },
        name: {
            alias: 'n',
            description: 'name for the new article',
            type: 'string',
            demandOption: true
        },
        date: {
            alias: 'd',
            description: 'a date string which can be parsed by new Date(), to set this article as a past one',
            type: 'string'
        }
    }, add)
    .command('update', 'to check & update index file', {

    })
    .command('delete', 'delete selected article', {
        
    })
    .command('tag', '')
    .argv;