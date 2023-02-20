const config = require('../config/config');
const request = require('request');
const fs = require('fs');


module.exports = {
    //根据symbols获取最新价格,同时写入
    async getNewPrice() {
        return new Promise((res, rej) => {
            console.log("45条5")
            const options = {
                url: `${config.url + JSON.stringify(config.symbols).toUpperCase()}`,
                timeout: 10000
            };
            request.get(options, async (err, data) => {
                if (err) {
                    console.log(err);
                    rej(err);
                } else {
                    if (await this.getOldPrice() === null) {//首次空文件，写入
                        const result = { latest: JSON.parse(data.body) }
                        fs.writeFile(config.readFilePath, JSON.stringify(result), (err) => { console.log(err) });
                    }
                    res(JSON.parse(data.body));
                }
            })
        })
    },

    async getOldPrice() {
        return new Promise((res, rej) => {
            fs.readFile(config.readFilePath, (err, data) => {
                if (err) {
                    console.log(err);
                    rej(err);
                } else {
                    try {
                        res(JSON.parse(data));
                    } catch (e) {
                        res(null)
                    }
                }
            })
        })
    },


    async toCompare(oldPrice, newPrice) {
        return new Promise((res, rej) => {
            const result = oldPrice.map(oldItem => {
                const { symbol, price: oldPrice } = oldItem;
                let newPriceValue = 0;
                const newItem = newPrice.find(newItem => newItem.symbol === symbol);
                if (newItem) {
                    newPriceValue = Number(newItem.price);
                }
                const diff = newPriceValue - Number(oldPrice);
                return { symbol, price: diff.toFixed(2) };
            });
            res(result)
        })
    },


    async fiveMins(oldPrice, newPrice) {

    },

    async fifteenMins(oldPrice, newPrice) {

    },

    async anHour(oldPrice, newPrice) {

    },

    async oneDay(oldPrice, newPrice) {

    },

    async customization(oldPrice, newPrice) {//自定义时间
        let time = config.customTime;
        if (time == '一天' || time == '1天' || time == '1d') {
            time = 86400;
        }
        if (time == '一天' || time == '1天' || time == '1d') {
            time = 86400;
        }
        if (time == '一天' || time == '1天' || time == '1d') {
            time = 86400;
        }
        if (time == '一天' || time == '1天' || time == '1d') {
            time = 86400;
        }
    }
}