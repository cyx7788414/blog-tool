import * as yargs from 'yargs';
import * as path from 'path';
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
            }
        }
    },
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
            }
        }
    },
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
            }
        }
    },
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
            }
        }
    },
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
            }
        }
    },
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
            }
        }
    },
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
            }
        }
    },
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
            }
        }
    },
];

const handle = (argv: yargs.Arguments<any>, indexObj: Index): void => {
    let result = indexObj.articles;
    conditionList.filter(v => argv[v.type]).forEach(v => {
        result = result.filter(v.getHandle(indexObj, argv[v.type]));
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