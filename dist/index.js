"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const init_1 = require("./command/init");
const add_1 = require("./command/add");
const update_1 = require("./command/update");
const del_1 = require("./command/del");
const attr_1 = require("./command/attr");
const search_1 = require("./command/search");
const argv = yargs
    .usage('help to write blog with markdown & generate data like index/classification')
    .help('help').alias('help', 'h')
    .version('version', '1.0.0').alias('version', 'v')
    .command('init', 'init base path', {
    path: {
        alias: 'p',
        description: 'base path',
        default: './',
        type: 'string'
    }
}, init_1.default)
    .command('add', 'add new article', {
    path: {
        alias: 'p',
        description: 'initialized base path',
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
}, del_1.default)
    .command('attr', 'show list/rename/delete attribute like type or tag, the first independent option will be run with other ignore', {
    path: {
        alias: 'p',
        description: 'a base path (which have a index.json)',
        default: './',
        type: 'string'
    },
    list: {
        alias: 'l',
        description: 'show the list of target, independent',
        default: false,
        type: 'boolean'
    },
    rename: {
        alias: 'r',
        description: 'select item and then rename it, independent',
        default: false,
        type: 'boolean'
    },
    delete: {
        alias: 'd',
        description: 'choice some item and delete them, independent',
        default: false,
        type: 'boolean'
    }
}, attr_1.default)
    .command('search', 'search article with tag/type/name/auther/date', {
    path: {
        alias: 'p',
        description: 'a base path (which have a index.json)',
        default: './',
        type: 'string'
    },
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
    earliestcreate: {
        alias: 'ec',
        description: 'a date string which can be parsed by new Date(), as the earliest create date of search condition',
        type: 'string'
    },
    latestcreate: {
        alias: 'lc',
        description: 'a date string which can be parsed by new Date(), as the latest create date of search condition',
        type: 'string'
    },
    earliestupdate: {
        alias: 'eu',
        description: 'a date string which can be parsed by new Date(), as the earliest update date of search condition',
        type: 'string'
    },
    latestupdate: {
        alias: 'lu',
        description: 'a date string which can be parsed by new Date(), as the latest update date of search condition',
        type: 'string'
    },
    status: {
        alias: 's',
        description: 'add substr of status to search condition',
        type: 'string'
    }
}, search_1.default)
    .argv;
