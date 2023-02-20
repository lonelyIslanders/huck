module.exports = {
    url: 'https://www.binance.com/api/v3/ticker/price?symbols=',
    symbols: [
        "BTCUSDT",
        "ETHUSDT"
    ],
    readFilePath: './fileSave/data.json',
    customTime: ''//支持格式：1d、1天、一天、1秒、一秒、1s……类似等等
}