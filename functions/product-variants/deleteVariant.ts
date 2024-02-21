export function deleteProductVariant(
  product_id: number,
  variant_id: number
): Promise<undefined> {
  return new Promise(async function (resolve, reject) {
    try {
      await require("../../config/config").store.delete(
        `/catalog/products/${product_id}/variants/${variant_id}`
      );
      resolve(undefined)
    } catch (err) {
      reject(err);
    }
  });
}
