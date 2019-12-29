/**
 * * Created by lee on 2019/7/10
 * add ejs suffix
 */

const fs = require('fs');
const { resolve } = require('path');
const { getAllFilesInDir } = require('./utils/fs');
const shell = require('child_process').execSync;

const TEMP = 'templates';

function getAllTemplatesRoot(path, lists = []) {
    let items = fs.readdirSync(path);
    items.forEach(item => {
        let childPath = `${path}/${item}`;
        if (fs.statSync(childPath).isDirectory()) {
            if (item === TEMP) {
                lists.push(childPath);
            } else {
                getAllTemplatesRoot(childPath, lists);
            }
        }
    });
    return lists;
}

function transform(rootPath) {
    let templates = getAllTemplatesRoot(rootPath, []);
    let files = [];
    templates.forEach(tmp => {
        files = files.concat(getAllFilesInDir(tmp));
    });

    files = files.filter(file => file.indexOf('.ejs') === -1);

    files.forEach(file => {
        shell(`mv ${file} ${file}.ejs`);
    });
}

transform(resolve(__dirname, "generators")); // eslint-disable-line
