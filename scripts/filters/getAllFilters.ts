import { getCustomFields } from "../../functions/custom-fields/getCustomFields";

import { getAllProducts } from "../../functions/products/getAllProducts";

getCustomFields;

require("../../config/config").config("bf");

(async function () {
  const products = await getAllProducts();

  const promises = [];
  for (const product of products) {
    promises.push(getCustomFields(product.id));
  }

  const res = await Promise.allSettled(promises);

  console.log(res);
})();
