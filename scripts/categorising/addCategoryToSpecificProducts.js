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

const catId = 1491;

const productIds = [{"Product ID":4400},
{"Product ID":4401},
{"Product ID":4403},
{"Product ID":4404},
{"Product ID":4405},
{"Product ID":4406},
{"Product ID":4407},
{"Product ID":4408},
{"Product ID":4409},
{"Product ID":4410}];

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
