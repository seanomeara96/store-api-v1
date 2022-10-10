require("../../config/config").config("ah");

const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");

const catId = 225;

const productIds = [{"Product ID":966},
{"Product ID":968},
{"Product ID":969},
{"Product ID":1623},
{"Product ID":1625},
{"Product ID":1628},
{"Product ID":1661},
{"Product ID":1764},
{"Product ID":1765},
{"Product ID":1766},
{"Product ID":1767},
{"Product ID":1768},
{"Product ID":1769},
{"Product ID":1792},
{"Product ID":1793},
{"Product ID":1810},
{"Product ID":1848},
{"Product ID":1890},
{"Product ID":1891},
{"Product ID":1895},
{"Product ID":1896},
{"Product ID":1899},
{"Product ID":2072},
{"Product ID":2075},
{"Product ID":2076},
{"Product ID":2077},
{"Product ID":2078},
{"Product ID":2079},
{"Product ID":2080},
{"Product ID":2081},
{"Product ID":2082},
{"Product ID":2083},
{"Product ID":2105},
{"Product ID":2107},
{"Product ID":2108},
{"Product ID":2109},
{"Product ID":2110},
{"Product ID":2111},
{"Product ID":2116},
{"Product ID":2117},
{"Product ID":2118},
{"Product ID":2119},
{"Product ID":2120},
{"Product ID":2121}];

addCategoryToSpecificProducts(productIds, catId)
  .then((res) =>
    console.log(
      `${
        res.filter(({ status }) => status === "fulfilled").length
      } added to cat ${catId}`
    )
  )
  .catch(console.log);
