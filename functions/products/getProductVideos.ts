export const getProductVideos = (product_id: number) => {
  return new Promise((resolve, reject) => {
    require("../../config/config")
      .store.get(`/catalog/products/${product_id}/videos`)
      .then((res: any) => resolve({ product_id, videos: res.data.data }))
      .catch((err: any) => reject(err.response.data));
  });
};
