import * as fs from 'fs';

const initializableCheck = (path: string): boolean => {
   let files = fs.readdirSync(path);
//    if (files.includes('index.json') || files.includes('articles') || files.includes('version.json')) {
   if (files.includes('index.json') || files.includes('articles')) {
       return false;
   }
   return true;
};

const initializedCheck = (path: string): boolean => {
    let files = fs.readdirSync(path);    
//    if (files.includes('index.json') && files.includes('articles') && files.includes('version.json')) {
   if (files.includes('index.json') && files.includes('articles')) {
       return true;
   }
   return false;
};

const toolOperation = {
    initializableCheck: initializableCheck,
    initializedCheck: initializedCheck
};

export default toolOperation;