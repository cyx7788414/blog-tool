"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const init_1 = require("./command/init");
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
})
    .command('update', 'to check & update index file', {})
    .command('delete', 'delete selected article', {})
    .command('tag', '')
    .argv;
console.log(argv);
