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
  function countFulfilled(allSettledResult: PromiseSettledResult<any>[]) {
    function countIfFulfilled(a: any, c: any) {
      return c.status === "fulfilled" ? a + 1 : a;
    }
    return allSettledResult.reduce(countIfFulfilled, 0);
  }

  console.log(`${countFulfilled(res)}/${res.length} fulfilled`);
}

// add max 5 limit to products
function applyMaxOderQtyToBrand(
  store: string,
  brandName: string,
  limit: number
) {
  return new Promise(function (resolve, reject) {
    require("../../config/config").config(store);
    getProductsByBrand(brandName)
      .then((products: Product[]) => {
        applyMaxLimit(products, limit)
          .then(notifyFulfillmentStatus)
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
}

const storeDetails = [
  {
    store: "bf",
    brand: "The Ordinary",
  },
];

(async function () {
  for (const d of storeDetails) {
    await applyMaxOderQtyToBrand(d.store, d.brand, 0);
  }
})();
