const fs = require('fs');

module.exports = {
    async fileIsExistAndTouch() {
        return new Promise((res, rej) => {
            if (!fs.existsSync('./fileSave/data.json')) {
                console.log("不存在")
                fs.writeFile('./fileSave/data.json', '', (err) => {
                    if (err) {
                        rej(err)
                    }
                })
            } else {
                console.log('存储文件已存在');
                res()
            }
        })
    },

    //写入文件
    async writeFun(path, data) {
        return new Promise((res, rej) => {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }
            fs.writeFile(path, data, (err) => {
                if (err) {
                    console.log(err);
                    rej(err);
                }
            })
        })
    },

    //读取文件
    async readFun(path) {
        return new Promise((res, rej) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    console.log("读取文件失败", err)
                    rej(err)
                } else {
                    res(JSON.parse(data));
                }
            })
        })
    }
}