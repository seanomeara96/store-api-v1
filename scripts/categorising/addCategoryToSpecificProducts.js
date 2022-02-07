require("../../config/config").config("bf");
const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [
  { "Product ID": 1772 },
  { "Product ID": 2054 },
  { "Product ID": 2315 },
  { "Product ID": 2324 },
  { "Product ID": 2401 },
  { "Product ID": 2547 },
  { "Product ID": 2596 },
  { "Product ID": 2598 },
  { "Product ID": 2694 },
  { "Product ID": 2805 },
  { "Product ID": 2807 },
  { "Product ID": 3307 },
  { "Product ID": 3404 },
  { "Product ID": 3455 },
  { "Product ID": 3711 },
  { "Product ID": 4163 },
  { "Product ID": 5256 },
  { "Product ID": 5257 },
  { "Product ID": 5332 },
  { "Product ID": 5333 },
  { "Product ID": 5357 },
  { "Product ID": 5501 },
  { "Product ID": 5543 },
  { "Product ID": 5544 },
];

let catId = 680; //

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
main();
