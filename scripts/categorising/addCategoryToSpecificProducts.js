require("../../config/config").config("bf");
const { addCatToProduct } = require("../../functions/products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":4178},
{"Product ID":4216},
{"Product ID":4333},
{"Product ID":4433},
{"Product ID":4435},
{"Product ID":4507},
{"Product ID":4508},
{"Product ID":4509},
{"Product ID":4510},
{"Product ID":4513},
{"Product ID":4514},
{"Product ID":4515},
{"Product ID":4516},
{"Product ID":4517},
{"Product ID":4743},
{"Product ID":4745},
{"Product ID":5380},
{"Product ID":5381},
{"Product ID":5382},
{"Product ID":5383},
{"Product ID":5384},
{"Product ID":5385},
{"Product ID":5386},
{"Product ID":5387},
{"Product ID":5388},
{"Product ID":5389},
{"Product ID":5390},
{"Product ID":5391},
{"Product ID":5392},
{"Product ID":5446},
{"Product ID":5447},
{"Product ID":5448},
{"Product ID":5449},
{"Product ID":5450},
{"Product ID":5451},
{"Product ID":5452},
{"Product ID":5453},
{"Product ID":5454},
{"Product ID":5455},
{"Product ID":5456},
{"Product ID":5457},
{"Product ID":5458},
{"Product ID":5459},
{"Product ID":5460},
{"Product ID":5461},
{"Product ID":5462},
{"Product ID":5463},
{"Product ID":5464},
{"Product ID":5466},
{"Product ID":5467},
{"Product ID":5468},
{"Product ID":5469},
{"Product ID":5470},
{"Product ID":5471},
{"Product ID":5472},
{"Product ID":5473},
{"Product ID":5474},
{"Product ID":5475},
{"Product ID":5476},
{"Product ID":5477},
{"Product ID":5478},
{"Product ID":5479},
{"Product ID":5480},
{"Product ID":5481},
{"Product ID":5482},
{"Product ID":5483},
{"Product ID":5484},
{"Product ID":5485},
{"Product ID":5486}]
// alfaparf products with shampoo mentioned in cat field

let catId = 624; // christmas sale
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
