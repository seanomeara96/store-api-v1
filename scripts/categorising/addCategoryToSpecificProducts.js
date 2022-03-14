require("../../config/config").config("bf");
const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":2737},
{"Product ID":2866},
{"Product ID":2954},
{"Product ID":2955},
{"Product ID":2960},
{"Product ID":2964},
{"Product ID":2967},
{"Product ID":3018},
{"Product ID":3023},
{"Product ID":3085},
{"Product ID":3414},
{"Product ID":3415},
{"Product ID":3416},
{"Product ID":3418},
{"Product ID":3436},
{"Product ID":3440},
{"Product ID":3441},
{"Product ID":3451},
{"Product ID":3455},
{"Product ID":3460},
{"Product ID":3483},
{"Product ID":3509},
{"Product ID":3658},
{"Product ID":3659},
{"Product ID":3713},
{"Product ID":3737},
{"Product ID":3944},
{"Product ID":4787},
{"Product ID":4931},
{"Product ID":5256},
{"Product ID":5332},
{"Product ID":5333},
{"Product ID":5334},
{"Product ID":5335},
{"Product ID":5336},
{"Product ID":5337},
{"Product ID":5488}]

let catId = 595; //

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
