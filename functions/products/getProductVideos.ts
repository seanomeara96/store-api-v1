export async function getProductVideos(product_id: number): Promise<Video[]> {
  try {
    const config = require("../../config/config");
    const res = await config.store.get(
      `/catalog/products/${product_id}/videos`,
    );
    return res.data.data;
  } catch (err: any) {
    throw err.response.data;
  }
}

interface Video {
  title: string;
  description: string;
  sort_order: number;
  type: string;
  video_id: string;
}
