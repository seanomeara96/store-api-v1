require("../../config/config").config("bf");

const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const catId = 515; //clearance

const productIds = [
  { "Product ID": 5116 },
  { "Product ID": 5117 },
  { "Product ID": 5118 },
  { "Product ID": 5119 },
  { "Product ID": 5120 },
  { "Product ID": 5121 },
  { "Product ID": 5122 },
  { "Product ID": 5123 },
  { "Product ID": 5124 },
  { "Product ID": 5125 },
  { "Product ID": 5126 },
  { "Product ID": 5185 },
  { "Product ID": 5273 },
  { "Product ID": 5611 },
  { "Product ID": 6139 },
];

addCategoryToSpecificProducts(productIds, catId)
  .then((res) =>
    console.log(
      `${
        res.filter(({ status }) => status === "fulfilled").length
      } / ${productIds.length} added to cat ${catId}`
    )
  )
  .catch(console.log);
