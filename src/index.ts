import * as yargs  from 'yargs';

import init from './command/init';
import add from './command/add';
import update from './command/update';

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
        },
        auther: {
            alias: 'a',
            description: 'auther of this article',
            type: 'string'
        }
    }, add)
    .command('update', 'to update a article & index.json', {
        path: {
            alias: 'p',
            description: 'a article path (which have a article.md)',
            default: './',
            type: 'string'
        },
        name: {
            alias: 'n',
            description: 'change the name of this article',
            type: 'string'
        },
        auther: {
            alias: 'a',
            description: 'change the auther of this article',
            type: 'string'
        }
    }, update)
    .command('delete', 'delete selected article', {
        
    })
    .command('tag', '')
    .argv;