export function getAllProductVideos(product_id: number): Promise<ProductVideo> {
  return new Promise(async function (resolve, reject) {
    try {
      if (typeof product_id !== "number") reject("product id must be a number");
      const res = await require("../../config/config").store.get(
        `/catalog/products/${product_id}/videos`
      );
      resolve(res.data.data);
    } catch (err) {
      reject(err);
    }
  });
}
interface ProductVideo {
  title: string; // The title for the video. If left blank, this will be filled in according to data on a host site.
  description: string; // The description for the video. If left blank, this will be filled in according to data on a host site.
  sort_order: number; // The order in which the video will be displayed on the product page. Higher integers give the video a lower priority. When updating, if the video is given a lower priority, all videos with a sort_order the same as or greater than the video's new sort_order value will have their sort_orders reordered.
  type: string; // The video type (a short name of a host site). Allowed: youtube
  video_id: string; // The ID of the video on a host site.
  id: number; // The unique numeric ID of the product video; increments sequentially.
  product_id: number; // The unique numeric identifier for the product with which the image is associated.
  length: string; // Length of the video. This will be filled in according to data on a host site.
}
