const config = require('./config/config');
const fileCommand = require('./fileCommand/index');
const common = require('./common/index');





async function main() {
    await fileCommand.fileIsExistAndTouch();
    const oldPrice = await common.getOldPrice();
    const newPrice = await common.getNewPrice();
    const result = await common.toCompare(oldPrice.latest, newPrice)//得到最新数据差值
    console.log(oldPrice)
    console.log(newPrice);
    console.log(result)
}

(async () => {
    try {
        await main();
    } catch (e) {
        console.log(e);
    }
})()