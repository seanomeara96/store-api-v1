require("../../config/config").config("bf");

const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const catId = 724; //skincare

const productIds = [{"Product ID":3127},
{"Product ID":3137},
{"Product ID":3168},
{"Product ID":3169},
{"Product ID":3296},
{"Product ID":3312},
{"Product ID":3313},
{"Product ID":3315},
{"Product ID":3432},
{"Product ID":3645},
{"Product ID":3996},
{"Product ID":4071},
{"Product ID":4072},
{"Product ID":4075},
{"Product ID":4077},
{"Product ID":4081},
{"Product ID":4082},
{"Product ID":4151},
{"Product ID":4153},
{"Product ID":4165},
{"Product ID":4167},
{"Product ID":4203},
{"Product ID":4719},
{"Product ID":4813},
{"Product ID":5133},
{"Product ID":5243},
{"Product ID":5305},
{"Product ID":5306},
{"Product ID":5355},
{"Product ID":5394},
{"Product ID":5407},
{"Product ID":5408},
{"Product ID":5424},
{"Product ID":5425},
{"Product ID":5489},
{"Product ID":5677},
{"Product ID":5725},
{"Product ID":5798},
{"Product ID":5799},
{"Product ID":5801},
{"Product ID":5804},
{"Product ID":5867},
{"Product ID":5878},
{"Product ID":5880},
{"Product ID":6167},
{"Product ID":6285},
{"Product ID":6286},
{"Product ID":6287},
{"Product ID":6288},
{"Product ID":6289},
{"Product ID":6290},
{"Product ID":6291},
{"Product ID":6292},
{"Product ID":6293},
{"Product ID":6318},
{"Product ID":6320},
{"Product ID":6321},
{"Product ID":6329},
{"Product ID":6330},
{"Product ID":6331},
{"Product ID":6332},
{"Product ID":6333},
{"Product ID":6334},
{"Product ID":6336},
{"Product ID":6339},
{"Product ID":6385},
{"Product ID":6387},
{"Product ID":6400},
{"Product ID":6401},
{"Product ID":6474},
{"Product ID":6475}];

addCategoryToSpecificProducts(productIds, catId)
  .then((res) =>
    console.log(
      `${
        res.filter(({ status }) => status === "fulfilled").length
      } added to cat ${catId}`
    )
  )
  .catch(console.log);
