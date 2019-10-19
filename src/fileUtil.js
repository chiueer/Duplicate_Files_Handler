var fs = require('fs');
var path = require('path');

function deal(path, tagOfRepeatFile) {
    if (!fs.existsSync(path)) return;
    fs.stat(path, (err, stats) => {
        if (err) throw err;
        if (stats.isFile()) {
            if (path.indexOf(tagOfRepeatFile) != -1) {
                fs.unlink(path, err => {
                    var msg = '< Delete file successful! >';
                    if (err) {
                        msg = '< Delete file failed! >';
                        throw err;
                    }
                    fs.appendFile(__dirname + '/log.txt', msg + '\n  [path] ' + path + '\n  [fileName] ' + path.substring(path.lastIndexOf('/') + 1) + '\n\n', err => {
                        if (err) throw err;
                    });
                })
            }
        } else {
            fs.readdir(path, (err, fileNames) => {
                if (err) throw err;
                console.log(fileNames);
                fileNames.forEach(fileName => {
                    deal(filePath = path + '/' + fileName, tagOfRepeatFile);
                })
            });
        }
    })
}

var directory = path.join(__dirname, '/test_after');
deal(directory, '(1)');
