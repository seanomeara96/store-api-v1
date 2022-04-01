require("../../config/config").config("bf");
const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");



const productIds = [
  { "Product ID": 2401 },
  { "Product ID": 3155 },
  { "Product ID": 3156 },
  { "Product ID": 3638 },
  { "Product ID": 3785 },
  { "Product ID": 3786 },
  { "Product ID": 3980 },
  { "Product ID": 4052 },
  { "Product ID": 4053 },
  { "Product ID": 4054 },
  { "Product ID": 4809 },
  { "Product ID": 4926 },
  { "Product ID": 4927 },
  { "Product ID": 5357 },
  { "Product ID": 5376 },
  { "Product ID": 5412 },
];

let catId = 640; //

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
