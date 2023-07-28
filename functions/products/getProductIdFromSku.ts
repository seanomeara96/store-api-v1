export function getProductIdFromSku(sku: string):Promise<number> {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.get(
        "/catalog/variants",
        {
          params: { sku },
        }
      );
      if (!res.data.data.length) {
        return resolve(0)
      }
      resolve(res.data.data[0].product_id);
    } catch (err) {
      reject(err);
    }
  });
}
