require("../../config/config").config("bf");

const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const fulfilledReducerParams = [
  function (accumulator, current) {
    return current.status === "fulfilled" ? accumulator + 1 : accumulator;
  },
  0,
];

const catId = 22;

const productIds = [{"Product ID":1635},
{"Product ID":3746},
{"Product ID":3874},
{"Product ID":3971},
{"Product ID":3981},
{"Product ID":3982},
{"Product ID":4204},
{"Product ID":4300},
{"Product ID":4302},
{"Product ID":4334},
{"Product ID":4442},
{"Product ID":4444},
{"Product ID":4532},
{"Product ID":4548},
{"Product ID":4549},
{"Product ID":4551},
{"Product ID":4613},
{"Product ID":4614},
{"Product ID":4646},
{"Product ID":4756},
{"Product ID":4782},
{"Product ID":4784},
{"Product ID":4785},
{"Product ID":4786},
{"Product ID":4862},
{"Product ID":4865},
{"Product ID":5643},
{"Product ID":5859}];

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
