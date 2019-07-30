"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const statusList = [
    {
        id: 0,
        name: 'editing'
    },
    {
        id: 1,
        name: 'published',
    },
    {
        id: 2,
        name: 'deleted'
    }
];
const dataSource = {
    statusList: statusList
};
exports.default = dataSource;
