import { getCustomFields } from "../../functions/custom-fields/getCustomFields";

import { getAllProducts } from "../../functions/products/getAllProducts";

getCustomFields;

require("../../config/config").config("bf");

(async function () {
  const products = await getAllProducts();

  const promises = products.map((product) => getCustomFields(product.id));

  const res = await Promise.allSettled(promises);

  console.log(res);
})();
