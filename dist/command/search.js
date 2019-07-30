"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const moment = require("moment");
const common_1 = require("../common/common");
//         type: {
//         name: {
//         auther: 
//         earliestdate
//         latestdate: 
//         status: 
const conditionList = [
    {
        type: 'tag',
        getHandle: (indexObj, substr) => {
            let tags = indexObj.tags.filter(v => v.name.indexOf(substr) > -1).map(v => v.id);
            return (v) => {
                for (let item of v.tag) {
                    if (tags.includes(item)) {
                        return true;
                    }
                }
                return false;
            };
        }
    },
    {
        type: 'type',
        getHandle: (indexObj, substr) => {
            let types = indexObj.types.filter(v => v.name.indexOf(substr) > -1).map(v => v.id);
            return (v) => {
                return types.includes(v.type);
            };
        }
    },
    {
        type: 'name',
        getHandle: (indexObj, substr) => {
            return (v) => {
                return v.name && v.name.indexOf(substr) > -1;
            };
        }
    },
    {
        type: 'auther',
        getHandle: (indexObj, substr) => {
            return (v) => {
                return v.auther && v.auther.indexOf(substr) > -1;
            };
        }
    },
    {
        type: 'earliestcreate',
        getHandle: (indexObj, substr) => {
            let date = new Date(substr).getTime();
            console.log(date);
            return (v) => {
                return date && v.create >= date;
            };
        }
    },
    {
        type: 'latestcreate',
        getHandle: (indexObj, substr) => {
            let date = new Date(substr).getTime();
            return (v) => {
                return date && v.create <= date;
            };
        }
    },
    {
        type: 'earliestupdate',
        getHandle: (indexObj, substr) => {
            let date = new Date(substr).getTime();
            return (v) => {
                return date && v.update >= date;
            };
        }
    },
    {
        type: 'latestupdate',
        getHandle: (indexObj, substr) => {
            let date = new Date(substr).getTime();
            return (v) => {
                return date && v.update <= date;
            };
        }
    },
    {
        type: 'status',
        getHandle: (indexObj, substr) => {
            let status = common_1.default.data.statusList.filter(v => v.name.indexOf(substr) > -1).map(v => v.id);
            return (v) => {
                return status.includes(v.status);
            };
        }
    }
];
const handle = (argv, indexObj) => {
    let result = indexObj.articles;
    conditionList.filter(v => argv[v.type]).forEach(v => {
        result = result.filter(v.getHandle(indexObj, argv[v.type]));
    });
    output(result, indexObj);
};
const output = (articleList, indexObj) => {
    common_1.default.info.success('the results of the query are shown below:');
    articleList.forEach(v => {
        let type = indexObj.types.find(t => t.id === v.type);
        let tag = indexObj.tags.filter(t => v.tag.includes(t.id));
        let status = common_1.default.data.statusList.find(t => t.id === v.status);
        common_1.default.info.log(`
            id: ${v.id}
            name: ${v.name}
            type: ${type ? type.name : null}
            tags: ${tag.map(t => t.name).join(';')}
            path: ${v.path}
            auther: ${v.auther}
            create: ${moment(v.create).format('YYYY-MM-DD HH:mm:ss')}
            update: ${moment(v.update).format('YYYY-MM-DD HH:mm:ss')}
            status: ${status ? status.name : ''}
        `);
    });
};
const search = (argv) => {
    let absolutePath = path.resolve(argv.path);
    let indexPath = path.join(absolutePath, 'index.json');
    common_1.default.fs.read({
        path: indexPath,
        success: (data) => {
            let indexObj = JSON.parse(data.toString());
            handle(argv, indexObj);
        },
        error: () => {
            common_1.default.info.error('Invalid path');
        }
    });
};
exports.default = search;
