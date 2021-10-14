require("../../config/config").config("ah");
const { addCatToProduct } = require("../../functions/products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":624},
{"Product ID":653},
{"Product ID":654},
{"Product ID":655},
{"Product ID":656},
{"Product ID":657},
{"Product ID":658},
{"Product ID":670},
{"Product ID":674},
{"Product ID":682},
{"Product ID":689},
{"Product ID":698},
{"Product ID":703},
{"Product ID":952},
{"Product ID":957},
{"Product ID":973},
{"Product ID":994},
{"Product ID":1068},
{"Product ID":1125},
{"Product ID":1130},
{"Product ID":1162},
{"Product ID":1163},
{"Product ID":1291},
{"Product ID":1292},
{"Product ID":1296},
{"Product ID":1302},
{"Product ID":1304},
{"Product ID":1376},
{"Product ID":1377},
{"Product ID":1378},
{"Product ID":1411},
{"Product ID":1412},
{"Product ID":1465},
{"Product ID":1496},
{"Product ID":1497},
{"Product ID":1498},
{"Product ID":1499},
{"Product ID":1500},
{"Product ID":1501},
{"Product ID":1582},
{"Product ID":1655},
{"Product ID":1656},
{"Product ID":1661},
{"Product ID":1662},
{"Product ID":1663},
{"Product ID":1664},
{"Product ID":1718},
{"Product ID":1751},
{"Product ID":1752},
{"Product ID":1753},
{"Product ID":1764},
{"Product ID":1765},
{"Product ID":1766},
{"Product ID":1767},
{"Product ID":1768},
{"Product ID":1769}]
// alfaparf products with shampoo mentioned in cat field

let catId = 210; // christmas sale
/**
 * This needs to be tested before using
 * @param {object[]} productIds
 * @param {number} categoryId
 * @returns
 */
const addCategoryToSpecificProducts = (productIds, categoryId) =>
  new Promise((resolve, reject) => {
    if (!Array.isArray(productIds) || typeof categoryId !== "number")
      return reject("please check paramters");
    let promises = [];
    productIds.forEach((productId) => {
      let id = productId[Object.keys(productId)[0]];
      if (typeof id !== "number") return reject("product id must be a number");
      promises.push(addCatToProduct(id, categoryId));
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });

addCategoryToSpecificProducts(productIds, catId)
  .then((res) => console.log("addCategoryToSpecificProducts response", res))
  .catch(console.log);
