import { getAllProducts } from "../../functions/products/getAllProducts";
import { getProductVideos } from "../../functions/products/getProductVideos";
import { output } from "../utils/output";
require("../../config/config").config("bsk");

const exportAllProductsVideos = async () => {
  try {
    const data: any[] = []
    const products = await getAllProducts();
    for(const product of products){
      const videos = await getProductVideos(product.id)
      data.push({
        id: product.id,
        name: product.name,
        sku: product.sku,
        numberOfVideos: videos.length
      })
    }
    
  output("all-videos", data, true);
  } catch (err) {
    console.log(err);
  }
};
exportAllProductsVideos();
