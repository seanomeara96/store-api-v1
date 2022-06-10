export function getProductVariants(product_id: number) {
  return new Promise((resolve, reject) => {
    require("../../config/config")
      .store.get(`/catalog/products/${product_id}/variants`)
      .then((res: any) => resolve(res.data.data))
      .catch(reject);
  });
}
