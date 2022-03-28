require("../../config/config").config("bf");
const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":3436},
{"Product ID":3440},
{"Product ID":3441},
{"Product ID":3451},
{"Product ID":3455},
{"Product ID":3460},
{"Product ID":3483},
{"Product ID":3509},
{"Product ID":3658},
{"Product ID":3713},
{"Product ID":3944},
{"Product ID":4931},
{"Product ID":5488}]

let catId = 686; //

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
