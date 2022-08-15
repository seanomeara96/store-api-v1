require("../../config/config").config("bf");
const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const catId = 708;

const productIds = [{"Product ID":3238},
{"Product ID":3239},
{"Product ID":3289},
{"Product ID":3763},
{"Product ID":5517},
{"Product ID":5530},
{"Product ID":5531},
{"Product ID":5591},
{"Product ID":5906},
{"Product ID":6059},
{"Product ID":6145}]

addCategoryToSpecificProducts(productIds, catId)
  .then((res) =>
    console.log(
      `${
        res.filter(({ status }) => status === "fulfilled").length
      } added to cat ${catId}`
    )
  )
  .catch(console.log);
