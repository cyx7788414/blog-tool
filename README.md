# Blog Tool  
a blog tool base on command line 
help you to manange you article data  

# Github  
[blog-tool](https://github.com/cyx7788414/blog-tool)

# Install  
```bash
    npm install blog-tool
```
install this package as global will be better

# Usage  
```bash
    blog-tool --help
```

# Documentation

## Dictionary

+ **Base Path**: The root folder for article data
+ **Index File**: A **JSON** file which records all article's index information, just store under **Base Path**
+ **Articles Folder**: A folder storage the article's source file, at the same level of **Index File**
+ **Article File**: A **md** fild which record the article text, at the path relative to **Base Path** as `./articles/${yyyy}/${MM}/${id}`
+ **Type**: The top category for a article, which can only have one type
+ **Tag**: Attributes for a article, a article an have multiple tag
+ **Date String**: Date string, which can be parsed by new Date()

## File Structure Of Base Path

```shell
.
├── articles
│   └── 2019
│       └── 12
│           ├── 1
│           │   └── article.md  
│           └── 2
│               └── article.md
└── index.json
```

## Data Structure Of Index File

```javascript
{
    "types": [ // type list
        {
            "id": 0,
            "name": "test" // name
        }
    ],
    "tags": [ // tag list
        {
            "name": "test", // name
            "id": 0
        }
    ],
    "articles": [ // article list
        {
            "id": 1,
            "name": "test2", // title
            "type": 0, // type
            "tag": [  //tage list
                0
            ],
            "path": "./articles/2019/12/1", // the path of article.md relative to base path, the rule is `./articles/${yyyy}/${MM}/${id}`
            "auther": "", // auther
            "create": 1577699385273, // create time
            "update": 1577699385462, // update time
            "status": 0 // 0: editing, 1: published, 2: deleted
        }
    ]
}
```

## Command

The sub command of blog-tool is listed below

### init

Init a folder for article data

#### param

+ **path**: Set the **Base Path** string to init article data, alias 'p', default './'

### add

Add a new article

#### param

+ **path**: Set the **Base Path** string to init article data, alias 'p', default './'
+ **name**: Set the title of article, alias 'n', required
+ **date**: Set the create **Date String**, alias 'd'
+ **auther**: Set the auther string of article, alias 'a'

### update

Update some info of one article, set update time automatically

#### param

+ **path**: Set the path string which contain **Article File** to update article data, alias 'p', default './'
+ **name**: Reset the title of article, alias 'n'
+ **auther**: Reset the auther string of article, alias 'a

### delete

Delete a atricle or mark it's status as deleted

#### param

+ **path**: Set the path string which contain **Article File** to delete article data, alias 'p', default './'
+ **force**: Make choice to delete article data or marke it's status as deleted, alias 'f', default false

### attr

Choice and manage article attributes like **Type** and **Tag** in a **Base Path**, you can list/rename/delete them, independent params can only be used independently

#### param

+ **path**: Set the **Base Path** string, alias 'p', default './'
+ **list**: Show the list of target group, alias 'l', default false
+ **rename**: Choice one item in target group to rename it, alias 'r', default false
+ **delete**: Choice part of target group to delete them, alias 'd', default false

### search

Search atricle with selected attributes

#### param

+ **path**: Set the **Base Path** string, alias 'p', default './'
+ **tag**: Add substr of tag to search condition, alias 'ta'
+ **type**: Add substr of type to search condition, alias 'ty'
+ **name**: Add substr of name to search condition, alias 'n'
+ **auther**: Add substr of auther to search condition, alias 'a'
+ **earlistcreate**: Add earlist create **Date String** to search condition, alias 'ec'
+ **latestcreate**: Add latest create **Date String** to search condition, alias 'lc'
+ **earlistupdate**: Add earlist update **Date String** to search condition, alias 'eu'
+ **latestupdate**: Add latest update **Date String** to search condition, alias 'lu'
+ **stataus**: Add substr of status to search condition, alias 's'