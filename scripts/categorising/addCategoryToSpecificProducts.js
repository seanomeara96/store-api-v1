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

const catId = 1461;

const productIds = [{"Product ID":3576},
{"Product ID":3726},
{"Product ID":3727},
{"Product ID":3787},
{"Product ID":3818},
{"Product ID":3876},
{"Product ID":3877},
{"Product ID":3878},
{"Product ID":3886},
{"Product ID":4105},
{"Product ID":4113},
{"Product ID":4214},
{"Product ID":4276},
{"Product ID":4277},
{"Product ID":4278}];

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
