require("../../config/config").config("bf");
const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const productIds = [{"Product ID":6018},
{"Product ID":6019},
{"Product ID":6020},
{"Product ID":6021},
{"Product ID":6022},
{"Product ID":6028}]

let catId = 696;

addCategoryToSpecificProducts(productIds, catId)
  .then((res) =>
    console.log(
      `${
        res.filter(({ status }) => status === "fulfilled").length
      } added to cat ${catId}`
    )
  )
  .catch(console.log);
