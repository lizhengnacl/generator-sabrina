/**
 * * Created by lee on 2019/7/10
 */

function getAllFilesInDir(dirPath, list = []) {
    let fs = require('fs');
    let items = fs.readdirSync(dirPath);
    items.forEach(item => {
        let path = `${dirPath}/${item}`;
        if (fs.statSync(path).isDirectory()) {
            getAllFilesInDir(path, list);
        } else {
            list.push(path);
        }
    });
    return list;
}

exports.getAllFilesInDir = getAllFilesInDir;
