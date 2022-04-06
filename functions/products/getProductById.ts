/**
 *
 * @param {*} productId
 * @returns product object
 */
export const getProductById = (productId: number) =>
  new Promise((resolve, reject) =>
    require("../../config/config")
      .store.get(`/catalog/products/${productId}`)
      .then((response: any) => resolve(response.data.data))
      .catch((ex: any) => reject(ex.response))
  );
