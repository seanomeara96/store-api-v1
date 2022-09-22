export const getAllProductVariantOptions = (product_id: number) =>
  new Promise((resolve, reject) =>
    require("../../config/config").store.get(
      `/catalog/products/${product_id}/options`
    ).then((res:any) =>resolve(res.data.data)).catch(reject)
  );
