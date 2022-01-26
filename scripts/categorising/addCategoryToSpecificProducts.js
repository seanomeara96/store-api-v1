require("../../config/config").config("bf")
const { addCatToProduct } = require("../../functions/products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":5616},
{"Product ID":5617},
{"Product ID":5618},
{"Product ID":5619},
{"Product ID":5620},
{"Product ID":5621},
{"Product ID":5622}];

let catId = 676; //
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
    const promises = productIds.map((productId) => {
      const id = productId[Object.keys(productId)[0]];
      if (typeof id !== "number") return reject("product id must be a number");
      return addCatToProduct(id, categoryId);
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });
exports.addCategoryToSpecificProducts = addCategoryToSpecificProducts;
function main() {
  addCategoryToSpecificProducts(productIds, catId)
    .then((res) =>
      console.log(
        `${
          res.filter(({ status }) => status === "fulfilled").length
        } added to cat ${catId}`
      )
    )
    .catch(console.log);
}
main()