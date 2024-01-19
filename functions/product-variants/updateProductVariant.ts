export function updateProductVariant(
  product_id: number,
  variant_id: number,
  updateParams: any
) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.put(
        `/catalog/products/${product_id}/variants/${variant_id}`,
        updateParams
      );
      resolve(res.data.data)
    } catch (err) {
      reject(err);
    }
  });
}
