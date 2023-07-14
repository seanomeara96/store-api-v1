import { updateProduct } from "../products/updateProduct";

export function updateProductDescription(
  productId: number,
  updatedProductDescription: string
) {
  return new Promise(async function (resolve, reject) {
    try {
      resolve(
        await updateProduct(productId, {
          description: updatedProductDescription,
        })
      );
    } catch (err) {
      reject(err);
    }
  });
}
