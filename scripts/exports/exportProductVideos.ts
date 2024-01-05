const store = "bf";
require("../config/config").config(store);

import { getAllProducts } from "../../functions/products/getAllProducts";
import { getProductVideos } from "../../functions/products/getProductVideos";
import { output } from "../utils/output";
const exportProductVideos = async () => {
  try {
    const data: any = []
    const products = await getAllProducts()
    
    for (const product of products){
      const videos = await getProductVideos(product.id)
      for(const video of videos){
        data.push({
          id: product.id,
          name: product.name,
          sku: product.sku,
          ...video
        })
      }
    }
    
    await output("videos", data, true);
  } catch (err) {
    console.log(err);
  }
};
exportProductVideos();
