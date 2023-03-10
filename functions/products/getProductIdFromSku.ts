export function getProductIdFromSku(sku: string) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.get(
        "/catalog/variants",
        {
          params: { sku },
        }
      );
      if(!res.data.data.length) {
        throw "no matching variants"
      }
      resolve(res.data.data[0].product_id);
    } catch (err) {
      reject(err);
    }
  });
}
