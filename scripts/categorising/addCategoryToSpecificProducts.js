require("../../config/config").config("bf");
const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const productIds = [{"Product ID":5903},
{"Product ID":5904},
{"Product ID":6233},
{"Product ID":6241},
{"Product ID":6244}]


let catId = 702;

addCategoryToSpecificProducts(productIds, catId)
  .then((res) =>
    console.log(
      `${
        res.filter(({ status }) => status === "fulfilled").length
      } added to cat ${catId}`
    )
  )
  .catch(console.log);
