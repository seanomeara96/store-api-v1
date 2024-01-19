import { AxiosInstance } from "axios";

export class ProductVideos {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getAll(product_id: number) {
    try {
      const path = `/catalog/products/${product_id}/videos`;
      const res = await this.client.get(path);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }
}

export interface ProductVideo {
  title: string; // The title for the video. If left blank, this will be filled in according to data on a host site.
  description: string; // The description for the video. If left blank, this will be filled in according to data on a host site.
  sort_order: number; // The order in which the video will be displayed on the product page. Higher integers give the video a lower priority. When updating, if the video is given a lower priority, all videos with a sort_order the same as or greater than the video's new sort_order value will have their sort_orders reordered.
  type: string; // The video type (a short name of a host site). Allowed: youtube
  video_id: string; // The ID of the video on a host site.
  id: number; // The unique numeric ID of the product video; increments sequentially.
  product_id: number; // The unique numeric identifier for the product with which the image is associated.
  length: string; // Length of the video. This will be filled in according to data on a host site.
}
