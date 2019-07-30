import * as yargs from 'yargs';
import * as path from 'path';
import * as moment from 'moment';
import common from '../common/common';
import Index from '../class/index';
import Article from '../class/article';

//         type: {
//         name: {
//         auther: 
//         earliestdate
//         latestdate: 
//         status: 

const conditionList = [
    {
        type: 'tag',
        getHandle: (indexObj: Index, substr: string): any => {
            let tags = indexObj.tags.filter(v => v.name.indexOf(substr) > -1).map(v => v.id);
            return (v: Article): boolean => {
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
        getHandle: (indexObj: Index, substr: string): any => {
            let types = indexObj.types.filter(v => v.name.indexOf(substr) > -1).map(v => v.id);
            return (v: Article): boolean => {
                return types.includes(v.type);
            };
        }
    },
    {
        type: 'name',
        getHandle: (indexObj: Index, substr: string): any => {
            return (v: Article): boolean => {
                return v.name && v.name.indexOf(substr) > -1;
            };
        }
    },
    {
        type: 'auther',
        getHandle: (indexObj: Index, substr: string): any => {
            return (v: Article): boolean => {
                return v.auther && v.auther.indexOf(substr) > -1;
            };
        }
    },
    {
        type: 'earliestcreate',
        getHandle: (indexObj: Index, substr: string): any => {
            let date = new Date(substr).getTime();
            console.log(date)
            return (v: Article): boolean => {
                return date && v.create >= date;
            };
        }
    },
    {
        type: 'latestcreate',
        getHandle: (indexObj: Index, substr: string): any => {
            let date = new Date(substr).getTime();
            return (v: Article): boolean => {
                return date && v.create <= date;
            };
        }
    },
    {
        type: 'earliestupdate',
        getHandle: (indexObj: Index, substr: string): any => {
            let date = new Date(substr).getTime();
            return (v: Article): boolean => {
                return date && v.update >= date;
            };
        }
    },
    {
        type: 'latestupdate',
        getHandle: (indexObj: Index, substr: string): any => {
            let date = new Date(substr).getTime();
            return (v: Article): boolean => {
                return date && v.update <= date;
            };
        }
    },
    {
        type: 'status',
        getHandle: (indexObj: Index, substr: string): any => {
            let status = common.data.statusList.filter(v => v.name.indexOf(substr) > -1).map(v => v.id);
            return (v: Article): boolean => {
                return status.includes(v.status);
            };
        }
    }
];

const handle = (argv: yargs.Arguments<any>, indexObj: Index): void => {
    let result: Article[] = indexObj.articles;
    conditionList.filter(v => argv[v.type]).forEach(v => {
        result = result.filter(v.getHandle(indexObj, argv[v.type]));
    });
    output(result, indexObj);
};

const output = (articleList: Article[], indexObj: Index): void => {
    common.info.success('the results of the query are shown below:');
    articleList.forEach(v => {
        let type = indexObj.types.find(t => t.id === v.type);
        let tag = indexObj.tags.filter(t => v.tag.includes(t.id));
        let status = common.data.statusList.find(t => t.id === v.status);
        common.info.log(`
            id: ${v.id}
            name: ${v.name}
            type: ${type?type.name:null}
            tags: ${tag.map(t => t.name).join(';')}
            path: ${v.path}
            auther: ${v.auther}
            create: ${moment(v.create).format('YYYY-MM-DD HH:mm:ss')}
            update: ${moment(v.update).format('YYYY-MM-DD HH:mm:ss')}
            status: ${status?status.name:''}
        `);
    });
};

const search = (argv: yargs.Arguments<any>): void => {
    let absolutePath: string = path.resolve(argv.path);
    let indexPath: string = path.join(absolutePath, 'index.json');
    common.fs.read({
        path: indexPath,
        success: (data: Buffer): void  => {
            let indexObj: Index = JSON.parse(data.toString());
            handle(argv, indexObj);
        },
        error: () => {
            common.info.error('Invalid path');
        }
    });
};

export default search;