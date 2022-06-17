require("../../config/config").config("bf");
const { removeCatFromProduct } = require("../../functions/products/removeCatFromProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */

/**
 * This needs to be tested before using
 * @param {*} productIds
 * @param {*} categoryName
 * @returns
 */
const removeCategoryFromSpecificProducts = (productIds, categoryId) =>
  new Promise((resolve, reject) => {
    let promises = [];
    productIds.forEach((productId) => {
      let id = productId[Object.keys(productId)[0]];
      promises.push(removeCatFromProduct(id, categoryId));
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });
const productIds = [{"Product ID":6018},
{"Product ID":6019},
{"Product ID":6020},
{"Product ID":6021},
{"Product ID":6022},
{"Product ID":6023},
{"Product ID":6024},
{"Product ID":6025},
{"Product ID":6026},
{"Product ID":6027},
{"Product ID":6028},
{"Product ID":6029},
{"Product ID":6030},
{"Product ID":6031},
{"Product ID":6032},
{"Product ID":6033},
{"Product ID":6034},
{"Product ID":6035},
{"Product ID":6036},
{"Product ID":6037},
{"Product ID":6038},
{"Product ID":6039},
{"Product ID":6040},
{"Product ID":6041},
{"Product ID":6042},
{"Product ID":6043},
{"Product ID":6044},
{"Product ID":6045},
{"Product ID":6046},
{"Product ID":6047},
{"Product ID":6048},
{"Product ID":6049}]
const catId = 548;
removeCategoryFromSpecificProducts(productIds, catId)
  .then((res) =>
    console.log("removeCategoryFromSpecificProducts response", res)
  )
  .catch((err) => console.log(err));
