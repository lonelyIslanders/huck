const config = require('./config/config');
const fileCommand = require('./fileCommand/index');
const common = require('./common/index');





async function main() {
    await fileCommand.fileIsExistAndTouch();
    const newPrice = await common.getNewPrice();
    const oldPrice = await common.getOldPrice();
    const result = await common.toCompare(oldPrice, newPrice);
    console.log(newPrice)
}

(async () => {
    try {
        await main();
    } catch (e) {
        console.log(e);
    }
})()