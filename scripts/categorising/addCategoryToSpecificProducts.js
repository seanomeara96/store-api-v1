require("../../config/config").config("bf");

const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const fulfilledReducer = (accumulator, current) =>
  current.status === "fulfilled" ? accumulator + 1 : accumulator;

const catId = 725; //clearance

const productIds = [
  { "Product ID": 6557 },
  { "Product ID": 6558 },
  { "Product ID": 6559 },
  { "Product ID": 6560 },
  { "Product ID": 6561 },
  { "Product ID": 6562 },
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
