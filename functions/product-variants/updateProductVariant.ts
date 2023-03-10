export function updateProductVariant(
  product_id: number,
  variant_id: number,
  updateObject: any
) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.put(
        `/catalog/products/${product_id}/variants/${variant_id}`,
        updateObject
      );
      resolve(res.data.data)
    } catch (err) {
      reject(err);
    }
  });
}
