import { addCatToProduct } from "../../functions/products/addCatToProduct";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getStoreSKUs } from "../../functions/products/getStoreSKUs";

const delistJson = [{ "DELIST FILE": "4004" }];

const delistSkus = [
  ...new Set(
    delistJson.map(function (obj) {
      return Object.values(obj)[0];
    }),
  ),
];

if (typeof delistSkus[0] !== "string")
  throw new Error(`Expected typeof string. Received ${typeof delistSkus[0]}`);

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

(async function () {
  try {
    for (const store of stores) {
      require("../../config/config").config(store.id);
      console.log(store.id);

      const vars = await getStoreSKUs(250).catch(console.log);

      const products = await getAllProducts();

      let delistThese = vars.filter(function (l) {
        return delistSkus.includes(l.sku);
      });

      const alreadyDelisted = delistThese.filter(function (v) {
        return products
          .find(function (product) {
            return product.id === v.product_id;
          })
          .categories.includes(store.dable);
      });

      if (delistThese.length === alreadyDelisted.length) {
        console.log("all skus already delisted");
        continue;
      }

      delistThese = delistThese.filter(function (v) {
        return !alreadyDelisted
          .map(function ({ sku }) {
            return sku;
          })
          .includes(v.sku);
      });

      console.log(`${delistThese.length} to be delisted...`);

      if (!delistThese.length) continue;

      console.log(
        delistThese.map(function ({ sku, inventory_level }) {
          return { sku, inventory_level };
        }),
      );

      const delistedProductIds = delistThese.map(function (v) {
        return v.product_id;
      });

      if (typeof delistedProductIds[0] !== "number")
        throw new Error("Not a number");

      const res = await Promise.allSettled(
        delistedProductIds.map(function (pid) {
          return addCatToProduct(pid, store.dable);
        }),
      );

      const rejected = res
        .filter(function (res) {
          return res.status === "rejected";
        })
        .map(function ({ reason }) {
          return reason;
        });

      console.log(rejected);

      console.log(`${rejected.length} rejected`);
    }
  } catch (err) {
    console.log(err);
  }
})();
