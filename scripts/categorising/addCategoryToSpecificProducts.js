require("../../config/config").config("bf");
const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const productIds = [
  { "Product ID": 383 },
  { "Product ID": 390 },
  { "Product ID": 395 },
  { "Product ID": 2340 },
  { "Product ID": 2944 },
  { "Product ID": 3125 },
  { "Product ID": 3380 },
  { "Product ID": 3384 },
  { "Product ID": 3386 },
  { "Product ID": 3565 },
  { "Product ID": 3681 },
  { "Product ID": 3836 },
  { "Product ID": 3837 },
  { "Product ID": 4590 },
  { "Product ID": 4591 },
  { "Product ID": 4592 },
  { "Product ID": 4674 },
  { "Product ID": 4792 },
  { "Product ID": 5014 },
  { "Product ID": 5131 },
  { "Product ID": 5132 },
  { "Product ID": 5285 },
  { "Product ID": 5639 },
  { "Product ID": 5774 },
  { "Product ID": 5822 },
];

let catId = 21;

addCategoryToSpecificProducts(productIds, catId)
  .then((res) =>
    console.log(
      `${
        res.filter(({ status }) => status === "fulfilled").length
      } added to cat ${catId}`
    )
  )
  .catch(console.log);
