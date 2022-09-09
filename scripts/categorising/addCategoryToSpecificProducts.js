require("../../config/config").config("bf");
const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const catId = 683;

const productIds = [{"Product ID":5332},
{"Product ID":5333},
{"Product ID":5334},
{"Product ID":5335},
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
