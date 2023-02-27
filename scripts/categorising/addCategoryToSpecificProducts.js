require("../../config/config").config("ih");

const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const fulfilledReducerParams = [
  function (accumulator, current) {
    return current.status === "fulfilled" ? accumulator + 1 : accumulator;
  },
  0,
];

const catId = 1485;

const productIds = [
  { "Product ID": 4197 },
  { "Product ID": 4198 },
  { "Product ID": 4199 },
  { "Product ID": 4200 },
  { "Product ID": 4201 },
  { "Product ID": 4202 },
  { "Product ID": 4203 },
];

(async () => {
  try {
    const res = await addCategoryToSpecificProducts(productIds, catId);

    const totalCount = productIds.length;
    const fulfilledCount = res.reduce(...fulfilledReducerParams);

    const info = `${fulfilledCount} / ${totalCount} added to cat ${catId}`;
    console.log(info);
  } catch (err) {
    console.log(err);
  }
})();
