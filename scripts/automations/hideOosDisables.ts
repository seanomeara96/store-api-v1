import { Product } from "../../functions/products/Product";

import { getAllProducts } from "../../functions/products/getAllProducts";
import { productIsVisible } from "../../functions/products/productIsVisible";

const stores = [
  {
    id: "bsk",
    dable: 86,
  },
  {
    id: "bf",
    dable: 561,
  },
  {
    id: "bs",
    dable: 82,
  },
  {
    id: "ih",
    dable: 1473,
  },
  {
    id: "pb",
    dable: 167,
  },

  {
    id: "ah",
    dable: 205,
  },
];

(async () => {
  for (const store of stores) {
    require("../../config/config").config(store.id);
    const products = await getAllProducts({
      "categories:in": store.dable,
    });

    const isVisibleOos = products.filter(function (p) {
      return p.is_visible && !p.inventory_level;
    });
    console.log(isVisibleOos.length);

    if (!isVisibleOos.length) {
      console.log(`nothing to do on ${store.id}`);
      continue;
    }
    
    const promises = isVisibleOos.map((p) => productIsVisible(p.id, false));
    const res = await Promise.allSettled(promises);
    const errors = res.filter((r) => r.status === "rejected");
    console.log(`There were ${errors.length} errors`);
    if (errors.length) {
      console.log(errors);
    }
  }
})();
