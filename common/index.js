const config = require('../config/config');
const request = require('request');
const fs = require('fs');
const fileCommand = require('../fileCommand/index');

module.exports = {
    //根据symbols获取最新价格,同时写入
    async getNewPrice() {
        return new Promise((res, rej) => {
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
                        await fileCommand.writeFun(config.readFilePath, result)
                    } else {
                        const rd = await this.getOldPrice();
                        rd.latest = JSON.parse(data.body);
                        await fileCommand.writeFun(config.readFilePath, rd);
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
            try {
                const diff = oldPrice.map(oldItem => {
                    const { symbol, price: oldPriceValue } = oldItem;
                    const { price: newPriceValue } = newPrice.find(newItem => newItem.symbol === symbol) || {};
                    const newPriceNum = newPriceValue ? Number(newPriceValue) : 0;
                    const oldPriceNum = Number(oldPriceValue);
                    const diff = newPriceNum - oldPriceNum;
                    const diffRounded = Math.round(diff * 100) / 100;
                    if (diffRounded === 0) {
                        return null;
                    }
                    const percentageDiff = oldPriceNum === 0 ? 100 : (diffRounded / oldPriceNum) * 100;
                    const percentageDiffRounded = Math.round(percentageDiff * 100) / 100;
                    const diffObj = { symbol, price: diffRounded.toFixed(2), percentageDiff: percentageDiffRounded.toFixed(2) + '%' };
                    return diffObj;
                }).filter(diffItem => diffItem !== null);

                newPrice.forEach(newItem => {
                    if (!oldPrice.some(oldItem => oldItem.symbol === newItem.symbol)) {
                        diff.push({ symbol: newItem.symbol, price: newItem.price, percentageDiff: '100%' });
                    }
                });
                res(diff)
                return diff;
            } catch (error) {
                console.error(error);
                rej(error)
                throw new Error('Failed to compare prices');
            }
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