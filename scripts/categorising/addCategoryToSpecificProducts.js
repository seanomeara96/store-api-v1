require("../../config/config").config("bf");
const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const productIds = [{"Product ID":2545},
{"Product ID":2630},
{"Product ID":2679},
{"Product ID":2682},
{"Product ID":2691},
{"Product ID":2699},
{"Product ID":2816},
{"Product ID":2834},
{"Product ID":3007},
{"Product ID":3103},
{"Product ID":3141},
{"Product ID":3146},
{"Product ID":3152},
{"Product ID":3313},
{"Product ID":3314},
{"Product ID":3344},
{"Product ID":3345},
{"Product ID":3718},
{"Product ID":3723},
{"Product ID":3725},
{"Product ID":3731},
{"Product ID":3735},
{"Product ID":3828},
{"Product ID":3891},
{"Product ID":4479},
{"Product ID":4538},
{"Product ID":5167},
{"Product ID":5172},
{"Product ID":5176},
{"Product ID":5178},
{"Product ID":5186},
{"Product ID":5245},
{"Product ID":5407},
{"Product ID":5408},
{"Product ID":5409},
{"Product ID":5411},
{"Product ID":5416},
{"Product ID":5482},
{"Product ID":5571},
{"Product ID":5572},
{"Product ID":5573},
{"Product ID":5574},
{"Product ID":5575},
{"Product ID":5576},
{"Product ID":5667},
{"Product ID":5668},
{"Product ID":5669},
{"Product ID":5670},
{"Product ID":5671},
{"Product ID":5798},
{"Product ID":5800},
{"Product ID":5869},
{"Product ID":5870},
{"Product ID":5871},
{"Product ID":5922}]

let catId = 515;

addCategoryToSpecificProducts(productIds, catId)
  .then((res) =>
    console.log(
      `${
        res.filter(({ status }) => status === "fulfilled").length
      } added to cat ${catId}`
    )
  )
  .catch(console.log);
