import * as yargs  from 'yargs';

import init from './command/init';
import add from './command/add';
import update from './command/update';
import del from './command/del';
import attr from './command/attr';

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
        path: {
            alias: 'p',
            description: 'a article path (which have a article.md)',
            default: './',
            type: 'string'
        },
        force: {
            alias: 'f',
            description: 'set delete to true but do not delete it as default, delete article and index for true',
            default: false,
            type: 'boolean'
        }
    }, del)
    .command('attr', 'show list/rename/delete attribute like type or tag', {
        list: {
            alias: 'l',
            description: 'show the list of target',
            default: false,
            type: 'boolean'
        },
        rename: {
            alias: 'r',
            description: 'select item and then rename it',
            default: false,
            type: 'boolean'
        },
        delete: {
            alias: 'd',
            description: 'choice some item and delete them',
            default: false,
            type: 'boolean'
        }
    }, attr)
    .command('search', 'search article width tag/type/name/auther/date', {
        tag: {
            alias: 'ta',
            description: 'add substr of tag to search condition',
            type: 'string'
        },
        type: {
            alias: 'ty',
            description: 'add substr of type to search condition',
            type: 'string'
        },
        name: {
            alias: 'n',
            description: 'add substr of name to search condition',
            type: 'string'
        },
        auther: {
            alias: 'a',
            description: 'add substr of auther to search condition',
            type: 'string'
        },
        earliestdate: {
            alias: 'ed',
            description: 'a date string which can be parsed by new Date(), as the earliest date of search condition',
            type: 'string'
        },
        latestdate: {
            alias: 'ld',
            description: 'a date string which can be parsed by new Date(), as the latest date of search condition',
            type: 'string'
        }
    })
    .argv;