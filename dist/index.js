"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const init_1 = require("./command/init");
const add_1 = require("./command/add");
const update_1 = require("./command/update");
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
}, init_1.default)
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
}, add_1.default)
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
}, update_1.default)
    .command('delete', 'delete selected article', {})
    .command('tag', '')
    .command('search', '')
    .argv;
