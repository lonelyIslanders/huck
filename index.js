const config = require('./config/config');
const fileCommand = require('./fileCommand/index');
const common = require('./common/index');





async function main() {
    await fileCommand.fileIsExistAndTouch();
    const oldPrice = await common.getOldPrice();
    const newPrice = await common.getNewPrice();
    console.log(oldPrice)
    console.log(newPrice);
}

(async () => {
    try {
        await main();
    } catch (e) {
        console.log(e);
    }
})()