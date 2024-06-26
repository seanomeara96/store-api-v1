export function deleteProductImage(
  product_id: number,
  image_id: number
): Promise<undefined> {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.delete(
        `/catalog/products/${product_id}/images/${image_id}`
      );
      resolve(res.data.data)
    } catch (err) {
      reject(err);
    }
  })
}
