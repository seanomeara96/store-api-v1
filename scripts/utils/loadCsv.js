const csv = require("csvtojson");
/**
 * load csv to js object
 * @param {string} pathToFile 
 * @returns js object
 */
const loadCsv = (pathToFile) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await csv().fromFile(pathToFile);
            console.log(data[0])
            resolve(data)
        } catch (err) {
            reject(err);
        }
    })
}

exports.loadCsv = loadCsv