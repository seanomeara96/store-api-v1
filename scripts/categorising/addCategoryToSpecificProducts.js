require("../../config/config").config("ah");

const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const catId = 231;

const productIds = [{"Product ID":664},
{"Product ID":667},
{"Product ID":676},
{"Product ID":685},
{"Product ID":686},
{"Product ID":689},
{"Product ID":691},
{"Product ID":693},
{"Product ID":695},
{"Product ID":699},
{"Product ID":708},
{"Product ID":771},
{"Product ID":1010},
{"Product ID":1011},
{"Product ID":1012},
{"Product ID":1130},
{"Product ID":1382},
{"Product ID":1396},
{"Product ID":1397},
{"Product ID":1398},
{"Product ID":1399},
{"Product ID":1400},
{"Product ID":1401},
{"Product ID":1402},
{"Product ID":1403},
{"Product ID":1404},
{"Product ID":1405},
{"Product ID":1407},
{"Product ID":1408},
{"Product ID":1410},
{"Product ID":1411},
{"Product ID":1412},
{"Product ID":1413},
{"Product ID":1414},
{"Product ID":1415},
{"Product ID":1416},
{"Product ID":1417},
{"Product ID":1419},
{"Product ID":1422},
{"Product ID":1423},
{"Product ID":1424},
{"Product ID":1433},
{"Product ID":1434},
{"Product ID":1436},
{"Product ID":1465},
{"Product ID":1495},
{"Product ID":1659},
{"Product ID":1697},
{"Product ID":1731},
{"Product ID":1732},
{"Product ID":1790},
{"Product ID":1794},
{"Product ID":1818},
{"Product ID":1991},
{"Product ID":1992}];

addCategoryToSpecificProducts(productIds, catId)
  .then((res) =>
    console.log(
      `${
        res.filter(({ status }) => status === "fulfilled").length
      } added to cat ${catId}`
    )
  )
  .catch(console.log);
