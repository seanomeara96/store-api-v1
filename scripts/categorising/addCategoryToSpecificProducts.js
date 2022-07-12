require("../../config/config").config("bf");
const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const productIds = [,
{"Product ID":1534},
{"Product ID":1772},
{"Product ID":2058},
{"Product ID":2674},
]

let catId = 697;

addCategoryToSpecificProducts(productIds, catId)
  .then((res) =>
    console.log(
      `${
        res.filter(({ status }) => status === "fulfilled").length
      } added to cat ${catId}`
    )
  )
  .catch(console.log);
