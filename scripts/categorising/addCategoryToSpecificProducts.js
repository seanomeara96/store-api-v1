require("../../config/config").config("bf");

const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const catId = 640;

const productIds = [{"Product ID":3404},
{"Product ID":5332},
{"Product ID":5253},
{"Product ID":1772},
{"Product ID":3156},
{"Product ID":3455},
{"Product ID":3451},
{"Product ID":222},
{"Product ID":5920},
{"Product ID":6334},
{"Product ID":5795},
{"Product ID":4312}];

addCategoryToSpecificProducts(productIds, catId)
  .then((res) =>
    console.log(
      `${
        res.filter(({ status }) => status === "fulfilled").length
      } added to cat ${catId}`
    )
  )
  .catch(console.log);
