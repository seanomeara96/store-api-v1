export function getProductVideos (product_id: number): Promise<Video[]>  {
  return new Promise((resolve, reject) => {
    require("../../config/config")
      .store.get(`/catalog/products/${product_id}/videos`)
      .then((res: any) => resolve(res.data.data))
      .catch((err: any) => reject(err.response.data));
  });
};


interface Video {
  title: string;
  description: string;
  sort_order: number;
  type: string;
  video_id: string;
}
