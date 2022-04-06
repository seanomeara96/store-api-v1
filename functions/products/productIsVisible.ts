import { updateProduct } from "./updateProduct";

export const productIsVisible = (productId: number, is_visible: boolean) =>
  new Promise((resolve, reject) =>
    updateProduct(productId, {
      is_visible,
    })
      .then(resolve)
      .catch(reject)
  );
