require("../../config/config").config("bf");
const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const catId = 669;

const productIds = [{"Product ID":6297},
{"Product ID":6298},
{"Product ID":6299},
{"Product ID":6300},
{"Product ID":6301},
{"Product ID":6302},
{"Product ID":6303},
{"Product ID":6304},
{"Product ID":6305},
{"Product ID":6306}]

addCategoryToSpecificProducts(productIds, catId)
  .then((res) =>
    console.log(
      `${
        res.filter(({ status }) => status === "fulfilled").length
      } added to cat ${catId}`
    )
  )
  .catch(console.log);
