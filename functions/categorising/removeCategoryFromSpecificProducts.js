require("../config/config").config("bf");
const { removeCatFromProduct } = require("../products/removeCatFromProduct");
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
const productIds = [{"Product ID":3057},
{"Product ID":3066},
{"Product ID":3068},
{"Product ID":3069},
{"Product ID":3070},
{"Product ID":3543},
{"Product ID":3546},
{"Product ID":3553},
{"Product ID":3648},
{"Product ID":3711},
{"Product ID":3828},
{"Product ID":4021},
{"Product ID":4028},
{"Product ID":4032},
{"Product ID":4033},
{"Product ID":4034},
{"Product ID":4081},
{"Product ID":4087},
{"Product ID":4088},
{"Product ID":4090},
{"Product ID":4091},
{"Product ID":4136}]
const catId = 514;
removeCategoryFromSpecificProducts(productIds, catId)
  .then((res) =>
    console.log("removeCategoryFromSpecificProducts response", res)
  )
  .catch((err) => console.log(err));
