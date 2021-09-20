require("../config/config").config("bf");
const { addCatToProduct } = require("../products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":2734},
{"Product ID":2873},
{"Product ID":2950},
{"Product ID":2951},
{"Product ID":2952},
{"Product ID":2953},
{"Product ID":2954},
{"Product ID":2955},
{"Product ID":2956},
{"Product ID":2957},
{"Product ID":2958},
{"Product ID":2959},
{"Product ID":2960},
{"Product ID":2961},
{"Product ID":2962},
{"Product ID":2963},
{"Product ID":2964},
{"Product ID":2967},
{"Product ID":2968},
{"Product ID":2969},
{"Product ID":2970},
{"Product ID":3084},
{"Product ID":3085},
{"Product ID":3086},
{"Product ID":3414},
{"Product ID":3415},
{"Product ID":3416},
{"Product ID":3417},
{"Product ID":3418},
{"Product ID":3419},
{"Product ID":3420},
{"Product ID":3421},
{"Product ID":3659},
{"Product ID":3660},
{"Product ID":3661},
{"Product ID":3736},
{"Product ID":3737},
{"Product ID":3738},
{"Product ID":3923},
{"Product ID":3927},
{"Product ID":3928},
{"Product ID":3929},
{"Product ID":3930},
{"Product ID":3931},
{"Product ID":3932},
{"Product ID":3940},
{"Product ID":3941},
{"Product ID":3956},
{"Product ID":4233},
{"Product ID":4328},
{"Product ID":4776},
{"Product ID":4777},
{"Product ID":4779},
{"Product ID":4780},
{"Product ID":4781},
{"Product ID":4787},
{"Product ID":4788},
{"Product ID":4789},
{"Product ID":4815},
{"Product ID":4816},
{"Product ID":4817},
{"Product ID":5255},
{"Product ID":5256},
{"Product ID":5257},
{"Product ID":5258},
{"Product ID":5259},
{"Product ID":5261},
{"Product ID":5316},
{"Product ID":5317},
{"Product ID":5318},
{"Product ID":5319},
{"Product ID":5320},
{"Product ID":5322},
{"Product ID":5332},
{"Product ID":5333},
{"Product ID":5334},
{"Product ID":5335},
{"Product ID":5336},
{"Product ID":5337}]
// alfaparf products with shampoo mentioned in cat field

let catId = 570; // semi di lino
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
