import { Product } from "../../functions/products/Product";
import { getProductsByBrand } from "../../functions/products/getProductsByBrand";
import { updateProduct } from "../../functions/products/updateProduct";

const applyMaxOrderQty = (product_id: number, qty: number) =>
  new Promise((resolve, reject) =>
    updateProduct(product_id, { order_quantity_maximum: qty })
      .then(resolve)
      .catch(reject)
  );

const applyMaxLimit = (
  products: Product[],
  limit: number
): Promise<PromiseSettledResult<any>[]> =>
  new Promise((resolve, reject) => {
    Promise.allSettled(products.map(({ id }) => applyMaxOrderQty(id, limit)))
      .then((res) => resolve(res as PromiseSettledResult<any>[]))
      .catch(reject);
  });

function notifyFulfillmentStatus(res: PromiseSettledResult<any>[]) {
  console.log(
    `${res.reduce(function (a: any, c: any) {
      return c.status === "fulfilled" ? a + 1 : a;
    }, 0)}/${res.length} fulfilled`
  );
}

const storeDetails = [
  {
    store: "bf",
    brand: "The Ordinary",
    limit: 0,
  },
];

(async function () {
  for (const d of storeDetails) {
    await new Promise(function (resolve, reject) {
      require("../../config/config").config(d.store);
      getProductsByBrand(d.brand)
        .then((products: Product[]) => {
          applyMaxLimit(products, d.limit)
            .then(notifyFulfillmentStatus)
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  }
})();
