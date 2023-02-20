require("../../config/config").config("bf");

const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const fulfilledReducer = (accumulator, current) =>
  current.status === "fulfilled" ? accumulator + 1 : accumulator;

const catId = 736;

const productIds = [
  { "Product ID": 5460 },
  { "Product ID": 5461 },
  { "Product ID": 5462 },
  { "Product ID": 5463 },
  { "Product ID": 5482 },
  { "Product ID": 5713 },
  { "Product ID": 5799 },
  { "Product ID": 5871 },
  { "Product ID": 6131 },
  { "Product ID": 6454 },
  { "Product ID": 6499 },
  { "Product ID": 6500 },
];

(async () => {
  try {
    const res = await addCategoryToSpecificProducts(productIds, catId);

    const totalCount = productIds.length;
    const fulfilledCount = res.reduce(fulfilledReducer, 0);

    const info = `${fulfilledCount} / ${totalCount} added to cat ${catId}`;
    console.log(info);
  } catch (err) {
    console.log(err);
  }
})();
