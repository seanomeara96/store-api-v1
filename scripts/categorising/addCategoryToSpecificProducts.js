require("../../config/config").config("bf");
const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":5257},
{"Product ID":5333},
{"Product ID":5332},
{"Product ID":5256},
{"Product ID":2959},
{"Product ID":2960},
{"Product ID":3414},
{"Product ID":5334},
{"Product ID":5255},
{"Product ID":2956},
{"Product ID":3415},
{"Product ID":2954},
{"Product ID":5337},
{"Product ID":2955},
{"Product ID":3085},
{"Product ID":2952},
{"Product ID":5336},
{"Product ID":3418},
{"Product ID":3417},
{"Product ID":3022},
{"Product ID":3660},
{"Product ID":2950},
{"Product ID":5258},
{"Product ID":5316},
{"Product ID":3416}]

let catId = 540; //

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
