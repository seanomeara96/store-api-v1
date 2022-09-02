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
const productIds = [{"Product ID":4588},
{"Product ID":4589},
{"Product ID":5903},
{"Product ID":5904},
{"Product ID":5945},
{"Product ID":5946},
{"Product ID":5947},
{"Product ID":5948},
{"Product ID":5949},
{"Product ID":5950},
{"Product ID":5951},
{"Product ID":5952},
{"Product ID":5953},
{"Product ID":5968},
{"Product ID":5969},
{"Product ID":5970},
{"Product ID":5971},
{"Product ID":5972},
{"Product ID":5973},
{"Product ID":5974},
{"Product ID":5975},
{"Product ID":5976},
{"Product ID":5977},
{"Product ID":5978},
{"Product ID":5979},
{"Product ID":5980},
{"Product ID":5981},
{"Product ID":5982},
{"Product ID":5983},
{"Product ID":5984},
{"Product ID":5985},
{"Product ID":5986},
{"Product ID":5987},
{"Product ID":5988},
{"Product ID":5989},
{"Product ID":5990},
{"Product ID":5991},
{"Product ID":5992},
{"Product ID":5993},
{"Product ID":5994},
{"Product ID":5995},
{"Product ID":5996},
{"Product ID":5997},
{"Product ID":5998},
{"Product ID":5999},
{"Product ID":6000},
{"Product ID":6001},
{"Product ID":6002},
{"Product ID":6003},
{"Product ID":6178},
{"Product ID":6197},
{"Product ID":6198},
{"Product ID":6201},
{"Product ID":6202},
{"Product ID":6233},
{"Product ID":6234},
{"Product ID":6235},
{"Product ID":6236},
{"Product ID":6237},
{"Product ID":6238},
{"Product ID":6239},
{"Product ID":6240},
{"Product ID":6241},
{"Product ID":6242},
{"Product ID":6243},
{"Product ID":6245},
{"Product ID":6246}]
const catId = 640;
removeCategoryFromSpecificProducts(productIds, catId)
  .then((res) =>
    console.log("removeCategoryFromSpecificProducts response", res)
  )
  .catch((err) => console.log(err));
