import { ProductVideo } from "../../newclient/products/videos";

export async function getAllProductVideos(
  product_id: number,
): Promise<ProductVideo> {
  if (typeof product_id !== "number")
    throw new Error("product id must be a number");
  try {
    const res = await require("../../config/config").store.get(
      `/catalog/products/${product_id}/videos`,
    );
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
